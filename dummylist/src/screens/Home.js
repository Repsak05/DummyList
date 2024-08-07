import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";
import { readDataWithQuery, addSingleValueToDocument, addToDocument, readSingleUserInformation, deleteDocument } from "../../firebase.js";
import { calculatePlacement, calculateTimeLeft, differenceInTime, getAllTeams, getHowManyTasksEachTeamHasCompleted, getLeaderboard} from "../components/GlobalFunctions.js";
import { defaultImage } from "../defaultValues.js";

export default function Home({navigation})  
{
    //?CreateChallengePageTwo : If no friends: Display ability to add friends?
    //TODO: Placement icons for 1/2 and 2/2 should be opposite (Carousel)
    //!BINGO: End placement: Same amount of rows completed, then they should be sorted by total amount of tasks completed
    //!Long List placement, should depend on (in case that multipe has completed the challenge before time has run out) who finished all tasks first
    //Usage of task.friendsTask.length is not correct in TaskComponent
    //Usage of Leaderboard in Home.js is not needed?
    //?Should following be removed in leaderbord: .splice(0,5)
    //?Creating support page to write feedback to on Settings page
    //Replace your information by using global. (If not done alredy)
    //!Insert correct image on feedPage from home screen

    const [amountOfNotifications, setAmountOfNotifications] = useState(0);
    const [allChallenges, setAllChallenges] = useState()

    useEffect(() => { //Ensures correct amountOfNotifications
        if(amountOfNotifications == 0)
        {
            setAmountOfNotifications(false)
        }
    }, [amountOfNotifications])

    useEffect(() => {
        async function getAllYourChallenges() {
            try {
                // Wait for user information to be available
                const interval = setInterval(() => {
                    if (global.userInformation && global.userInformation.id) {
                        clearInterval(interval);
                        fetchChallenges();
                    }
                }, 300); // Check every x-millisecound if userID is available

                async function fetchChallenges() {
                    const example = await readDataWithQuery( "Challenges", 
                        [
                            { field: "startingTime", operator: "<", value: new Date() },
                            { field: "joinedMembers", operator: "array-contains", value: global.userInformation.id }
                        ], 
                        [{ field: "startingTime", direction: "desc" }]
                    );

                    setAllChallenges(example);
                }
            } catch (err) {
                console.error("Error fetching challenges:", err);
            }
        }

        getAllYourChallenges();        
    }, []);

    useEffect(() => {
        for(let challenges in allChallenges)
        {
            const challenge = allChallenges[challenges];
            checkIfChallengeIsDone(challenge);
        }
    }, [allChallenges])

    useEffect(() => {
        //Delete all challenges that are begun and none has joined:
        //? Maybe the user should get a notification about it?
        let challengesAfterSomeAreRemoved = [];
        let hasAnyBeenRemoved = false;
        async function deleteInvalidChallenges()
        {
            // console.log("Looking for Invalid challenges");
            for(let challenges in allChallenges)
            {
                const challenge = allChallenges[challenges];
                if(challenge.joinedMembers.length <= 1)
                {
                    hasAnyBeenRemoved = true;
                    
                    //Remove challenge from DB
                    try{
                        await deleteDocument("Challenges", challenge.id);
                    }catch(err){
                        console.log(err);
                    }
                } else{
                    challengesAfterSomeAreRemoved.push(challenge);
                }
            }

            if(hasAnyBeenRemoved){
                setAllChallenges(challengesAfterSomeAreRemoved);
                console.log("Challenge(s) removed");
            }
        }

        deleteInvalidChallenges();
    }, [allChallenges])

    function navigateToChallenge(challenge)
    {
        console.log("Clicked on " + challenge.challengeName)
        navigation.navigate("ChallengePage", {challenge})
    }

    function lookAtFinishScreen(challengeObj)
    {
        let shouldYouSeeFinishScreen = true; 
        if(challengeObj.peopleSeenFinishScreen)
        {
            for(let member of challengeObj.peopleSeenFinishScreen)
                {
                    if(member == global.userInformation.id){
                        shouldYouSeeFinishScreen = false;
                        break;
                    }
                }
        }

        return shouldYouSeeFinishScreen;
    }

    function mapOfHowManyTasksEachPlayerHasCompleted(challengeObj)
    {
        let map = {};
            
        //Figure out how many tasks each participant has completed 
        for(let tasks of challengeObj.tasks)
        {
            for(let friends in tasks.friendsTask)
            {
                const participantTaskObject = tasks.friendsTask[friends];

                if(participantTaskObject.hasCompletedTask)
                {
                    if(map[participantTaskObject.friendID])
                    {
                        map[participantTaskObject.friendID] += 1;

                    } else {
                        map[participantTaskObject.friendID] = 1;   
                    }
                }
            }
        }

        return map;
    }

    async function screenHasNowBeenSeen(challengeObj)
        {
            try{
                //? This very next line should maybe first happen when clicking continue of view leaderboard
                await addToDocument("Challenges", challengeObj.id, "peopleSeenFinishScreen", global.userInformation.id, true); 
            }catch(err){
                console.log(err);
            }
    }

    function calculatePlacementFromSortedArr(challengeObj, placementOfAllPlayersInSortedArr, participant, )
    {
        let placement = challengeObj.joinedMembers.length;

        if(challengeObj.gameMode == "Team-Mode")
        {
            const teams = getAllTeams(challengeObj);
            let incrementingPlacement = 1;

            for(let teamStrings of placementOfAllPlayersInSortedArr)
            {
                const indexTeam = parseInt(teamStrings.split("Team")[1].trim()) - 1;
                
                
                for(let member of teams[indexTeam])
                {
                    if(member == participant){
                        placement = incrementingPlacement;
                        return placement;
                    }
                }
                incrementingPlacement++;
            }

        }else {
            for(let i = 0; i<placementOfAllPlayersInSortedArr.length; i++)
            {
                if(participant == placementOfAllPlayersInSortedArr[i])
                {
                    placement = i+1;
                    break;
                }
            }
        }
        return placement;
    }

    function getPlacementOfAllPlayers(challengeObj)
    {
        let placements = [];
        if(challengeObj.gameMode == "Bingo") //Sort by amount of rows;
        {
            //! Improve sorting: If multiple has same amount of rows completed, it should be based on amount of finished tasks.
            placements = calculateBingoPlacement(challengeObj);
        }
        
        else if(challengeObj.gameMode == "Long List" || challengeObj.gameMode == "Fastest Wins") //Sort by amount of tasks completed
        {
            //! Create better sorting for Long List (In case of multiple completing all tasks within timeframe (save completion-time in DB))
            const amountOfTasksComplete = determineWhetherChallengeIsComplete(challengeObj, true);
            
            let scoresArray = Object.entries(amountOfTasksComplete);
            scoresArray.sort((a, b) => b[1] - a[1]);
            placements = scoresArray.map(entry => entry[0]);
        }

        else if(challengeObj.gameMode == "Team-Mode")
        {
            const placementTeams = getLeaderboard(getHowManyTasksEachTeamHasCompleted(challengeObj));

            placements = [];

            for(let placementIndex of placementTeams)
            {
                placements.push(`Team ${placementIndex+1}`);
            }
        }
        return placements //= ["idplacement1", "idplacement2", ...] //In case of teams: ["Team 2", "Team 1", "Team 3"...]
    }

    function determineWhetherChallengeIsComplete(challengeObj, getAmountOfChallengesComplete = false)
    {
        if(challengeObj.gameMode == "Long List")
        {
            return calculateTimeLeft(challengeObj, true) < 0;
        } 
        
        else if(challengeObj.gameMode == "Bingo" || challengeObj.gameMode == "Fastest Wins")
        {
            const map = mapOfHowManyTasksEachPlayerHasCompleted(challengeObj);
            
            if(getAmountOfChallengesComplete){return map;}

            //Check wether anyone has completed all challenges:
            for(let amountOfCompletedTasks in map)
            {
                const amountCompleted = map[amountOfCompletedTasks];
                if(amountCompleted == challengeObj.tasks.length)
                {
                    return true;
                }
            }
            return false;
        } 
        
        else if(challengeObj.gameMode == "Team-Mode")
        {
            const amountOfTasksEachTeamHasCompleted = getHowManyTasksEachTeamHasCompleted(challengeObj);

            //check whether any team has completed all tasks 
            for(let teamKeys in amountOfTasksEachTeamHasCompleted)
            {
                const amountCompleted = amountOfTasksEachTeamHasCompleted[teamKeys];
                
                if(amountCompleted >= challengeObj.tasks.length){
                    return true;
                }
            }
            return false;
        }
    }

    async function setIsStillActiveFalse(challengeObj)
    {
        try{
            await addSingleValueToDocument("Challenges", challengeObj.id, "isStilActive", false);
            setHasFinishedChallenge(challengeObj);
        }catch(err){
            console.log(err);
        }
    }

    async function giveChallengeFinishedStats(participant, obj, placement)
    {
        try{
            await addToDocument("Users", participant, "Stats", obj, true, 0, "AveragePlacement");                                
            await addToDocument("Users", participant, "Stats", false, false, 1, "TimesParticipated");
        }catch(err){
            console.log(err);
        }
        
        //If player came 1st place updated amount of challenges won!
        if(placement == 1)
        {
            try{
                await addToDocument("Users", participant, "Stats", false, false, 1, "ChallengesWon");
                // console.log("Winners score was increased: " + participant);

            }catch(err){
                console.log(err);
            }
        }
    }

    async function checkIfChallengeIsDone(challengeObj)
    {
        //Setting inital values
        const isChallengeComplete = determineWhetherChallengeIsComplete(challengeObj); //Works for every Game Mode
        const shouldGiveAwardsToEveryone = Boolean(!challengeObj.peopleSeenFinishScreen);
        const shouldDisplayFinishScreen = lookAtFinishScreen(challengeObj);

        if(isChallengeComplete)
        {
            console.log("Challenge is complete: " + challengeObj.challengeName);
            if(shouldDisplayFinishScreen)
            {
                const placementOfAllPlayers = getPlacementOfAllPlayers(challengeObj); // = ["IDplacement1", "IDplacement2", ...]

                //If 2D-arr change how its being done
                setLeaderboard(placementOfAllPlayers);
                setImagesAndNames(placementOfAllPlayers, challengeObj);
                // screenHasNowBeenSeen();
                setHasFinishedChallenge(challengeObj);

    
                if(shouldGiveAwardsToEveryone) //Meaning its the first time its seen complete
                {
                    //Set challenge is complete:
                    setIsStillActiveFalse(challengeObj);
                                    
                    //Give stats to everyone
                    for(let participant of challengeObj.joinedMembers)
                    {
                        //Calculate placement and stats
                        const placement = calculatePlacementFromSortedArr(challengeObj, placementOfAllPlayers, participant);
                        const amountOfMembers = challengeObj.gameMode == "Team-Mode" ? challengeObj.teams.length : challengeObj.joinedMembers.length;
                        const obj = {placement : placement, amountOfMembers : amountOfMembers, challengeID : challengeObj.id};
                        
                        //Update stats
                        giveChallengeFinishedStats(participant, obj, placement);
                    }
                }
            }
        }
    }

    function calculateBingoPlacement(challenge, returnPlacementInsertID) //GameMode fastest wins
    { //TODO: If someone has same amount of rows complete, it should be dependent on amount of tasks complete
        //Create grid with true false depending on whether task is completed
        let rowMember = {}
        let gridMember = {}

        for(let participant of challenge.joinedMembers)
        {
            rowMember[participant] = []
            gridMember[participant] = []
        }

        let columnNumber = 0;   

        for(let task of challenge.tasks)
        {
            columnNumber++;
            const allPlayers = task.friendsTask;

            for(let friends of allPlayers)
            {
                if(friends.hasCompletedTask)
                {
                    const participantWhoHasCompletedTask = friends.friendID;
                    rowMember[participantWhoHasCompletedTask].push(true);
                }
            }

            if(columnNumber >= 4)
            {
                for(let participant of challenge.joinedMembers)
                {
                    gridMember[participant].push([...rowMember[participant]]);
                    rowMember[participant] = [];
                }
                columnNumber = 0;
            }
        }

        //map with player and amount of rows complete:
        let playersAmountOfRowsComplete = {}
        for(let players in gridMember)
        {
            const player = gridMember[players];
            let rowsComplete = 0;

            for(let row of player)
            {
                if(row.length == 4)
                {
                    rowsComplete++;
                }
            }
            playersAmountOfRowsComplete[players] = rowsComplete;
        }

        //Create an array which displays the placement of each member (sorted by amount of rows completed);
        const entries = Object.entries(playersAmountOfRowsComplete);
        entries.sort((a, b) => b[1] - a[1]);
        const sortedIDs = entries.map(entry => entry[0]);

        if(returnPlacementInsertID)
        {
            for(let i = 0; i< sortedIDs.length; i++)
            {
                if(sortedIDs[i] == returnPlacementInsertID)
                {
                    return i+1;
                }
            }
        }else {
            return sortedIDs;
        }
    }

    const [hasFinishedChallenge, setHasFinishedChallenge] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [topThreeInformation, setTopThreeInformation] = useState(false);
    const [shouldStillSeeLeaderboard, setShouldStillSeeLeaderboard] = useState(true);

    async function setImagesAndNames(ids, challenge )
    {
        if(challenge.gameMode == "Team-Mode") //In this case there is currently no images being added to leaderboard
        {
            let remakeTo2dArr = [];
            for(let values of ids)
            {
                remakeTo2dArr.push([values]);
            }
            setTopThreeInformation(remakeTo2dArr) // [["Team 2"], ["Team 1"], ["Team 3"]];

        }else {
            let arr = [] // [[n1, i1], [n2, i2], [n3, i3]]
            for(let id of ids.slice(0, 3))
            {
                const values = await returnImageAndNameFromID(id);
                arr.push(values);
            }
    
            setTopThreeInformation(arr);
            // console.log(arr);
        }
    }
    
    async function returnImageAndNameFromID(id) //! Can diffently be improved (useState)
    {
        if(id == global.userInformation.id && global.userInformation.Username)
        {
            const profilePic = global.userInformation.ProfilePicture || defaultImage;
            // console.log([global.userInformation.Username, profilePic])
            return [global.userInformation.Username, {uri : profilePic}];
        }else {
            try{
                const res = await readSingleUserInformation("Users", id);

                const profilPic = res.ProfilePicture || defaultImage;
                // console.log([res.Username, profilPic])
                return [res.Username, {uri : profilPic}];

            }catch(err){
                console.error(err);
            }
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Home"} navigation={navigation} isOnHomePage={true} hasNotifications={amountOfNotifications}/>
            </View>


            <View style={[styles.wrapper, {flexDirection: 'row', overflow: "scroll", marginBottom: 12 }]}>
                <View style={{width: "100%",}}> 
                    <CreateChallengeComponent navigation={navigation} amountOfComponents={allChallenges?.length + 1 || 1} />
                </View>
                {allChallenges?.map((challenge, index) => (
                    <View key={index}>
                        {differenceInTime(challenge.startingTime) <= 0 && (
                            <View>
                                {challenge.isStilActive && (
                                        <View style={{width: "100%",}} key={index}>
                                            <CarouselItem challengeIcon={challenge.challengeIcon} title={challenge.challengeName} amountOfComponents={allChallenges?.length + 1 || 3} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
                                        </View>
                                    )
                                }
                            </View>
                        )}
                    </View>
                ))}
            </View>


            <View style={[styles.homeFeedContainer, styles.wrapper, {height: 539}]}>
                <Pressable onPress={() => {console.log('Open feed'); navigation.navigate("FeedPage")}} style={{width: "100%", height: "100%"}}>
                    <ImageBackground source={require('../assets/images/test_image_1.jpg')} style={styles.homeFeedThumbnail}>
                        <View style={[styles.homeFeedTextBox, {position: "absolute", left: 0, bottom: 0, backgroundColor: "#006A68", height: 84}]}>
                            <Text style={styles.homeFeedText}>Check here what your friends are up to</Text>
                            <Image source={require('../assets/icons/longArrowIcon.svg')}/>
                        </View>
                    </ImageBackground>
                </Pressable>
            </View>


            {!hasFinishedChallenge?.id ? (
                <></>
            ): (
                <>
                    {shouldStillSeeLeaderboard && (
                        <View style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, backgroundColor: "#001D34", opacity: 0.95 }}>
                            {leaderboard && topThreeInformation && (
                                <View style={{ position: "absolute", bottom: "57%", left: 0, right: 0, alignItems: "flex-end", flexDirection: "row", justifyContent: "center" }}>
                                    {topThreeInformation.length >= 2 && (
                                        <View>
                                            {topThreeInformation[1][1] && (
                                                <Image style={{ marginBottom: 6, borderRadius: 7, width: 40, height: 40, alignSelf: "center" }} source={topThreeInformation[1][1]} />
                                            )}
                                            <View style={{ justifyContent: "flex-end", flexDirection: "column", backgroundColor: "#FFDF9D", borderTopLeftRadius: 42, borderTopRightRadius: 42, height: 126, width: 84 }}>
                                                <Text style={[styles.blackFontSize25, { textAlign: "center" }]}>#2</Text>
                                                <Text style={[styles.blackFontSize13, { marginBottom: 23, textAlign: "center", numberOfLines: 1, ellipsizeMode: "tail" }]}>{topThreeInformation[1][0]}</Text>
                                            </View>
                                        </View>
                                    )}
                                    
                                    {topThreeInformation.length >= 1 && (
                                        <View>
                                            {topThreeInformation[0][1] && (
                                                <Image style={{ marginBottom: 6, borderRadius: 7, width: 40, height: 40, alignSelf: "center" }} source={topThreeInformation[0][1]} />
                                            )}
                                            <View style={{ justifyContent: "flex-end", flexDirection: "column", backgroundColor: "#D0E4FF", borderTopLeftRadius: 42, borderTopRightRadius: 42, height: 174, width: 84 }}>
                                                <Text style={[styles.blackFontSize25, { textAlign: "center" }]}>#1</Text>
                                                <Text style={[styles.blackFontSize13, { marginBottom: 23, textAlign: "center", numberOfLines: 1, ellipsizeMode: "tail" }]}>{topThreeInformation[0][0]}</Text>
                                            </View>
                                        </View>
                                    )}
                                    
                                    {topThreeInformation.length >= 3 && (
                                        <View>
                                            {topThreeInformation[2][1] && (
                                                <Image style={{ marginBottom: 6, borderRadius: 7, width: 40, height: 40, alignSelf: "center" }} source={topThreeInformation[2][1]} />
                                            )}
                                            <View style={{ justifyContent: "flex-end", flexDirection: "column", backgroundColor: "#FFDAD2", borderTopLeftRadius: 42, borderTopRightRadius: 42, height: 93, width: 84 }}>
                                                <Text style={[styles.blackFontSize25, { textAlign: "center" }]}>#3</Text>
                                                <Text style={[styles.blackFontSize13, { marginBottom: 23, textAlign: "center", numberOfLines: 1, ellipsizeMode: "tail" }]}>{topThreeInformation[2][0]}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}

                            <View style={{ flex: 1, alignItems: "center", marginTop: "100%" }}>
                                <Text style={[styles.whiteFontSize25, {}]}>Congrats!</Text>
                                <Text style={[styles.whiteFontSize16Reg, { letterSpacing: 1.5, numberOfLines: 1, ellipsizeMode: "tail" }]}>
                                    You Finished{' '}
                                    <Text style={[styles.whiteFontSize16ExtraBold, { letterSpacing: 1.5 }]}>
                                        #{calculatePlacementFromSortedArr(hasFinishedChallenge, getPlacementOfAllPlayers(hasFinishedChallenge), global.userInformation.id)}
                                    </Text>
                                    {' '}in{' '}
                                    <Text style={[styles.whiteFontSize16ExtraBold, { letterSpacing: 1.5 }]}>
                                        {hasFinishedChallenge.challengeName}
                                    </Text>
                                </Text>
                            </View>

                            <View style={{ position: "absolute", bottom: 90, left: 0, right: 0, marginHorizontal: 30 }}>
                                <Pressable onPress={() => { setShouldStillSeeLeaderboard(false); screenHasNowBeenSeen(hasFinishedChallenge); }} style={[styles.roundedCornersSmall, { borderWidth: 5, borderColor: "#D0E4FF", backgroundColor: "#FFF", height: 40, justifyContent: "center" }]}>
                                    <Text style={[styles.blackFontSize16, { textAlign: "center", }]}>Continue</Text>
                                </Pressable>

                                <Pressable onPress={() => { setShouldStillSeeLeaderboard(false); screenHasNowBeenSeen(hasFinishedChallenge); navigation.navigate("LeaderboardWhenChallengeIsFinished", { challenge: hasFinishedChallenge }); }} style={{ backgroundColor: "#D3EC9E", borderRadius: 5, width: 150, marginTop: 20, alignSelf: "center" }}>
                                    <Text style={[styles.blackFontSize16, { textAlign: "center", }]}>View Leaderboard</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </>
            )}
        </View>
    )
}
