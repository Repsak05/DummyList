import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";
import { readDataWithQuery, addSingleValueToDocument, addToDocument, readSingleUserInformation } from "../../firebase.js";
import { calculatePlacement, differenceInTime } from "../components/GlobalFunctions.js";

export default function Home({navigation})  
{   //TODO: Fix background colors on create challenge and active challenges
    //TODO: Create placement icon with just 1/2 and 2/2
    /*//? TODO: Dertermine wether the challenge is finished and hasBeen opened by you
        //? maybe create new collection with finished challenges - though probably not necessary*/

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

    function navigateToChallenge(challenge)
    {
        console.log("Clicked on " + challenge.challengeName)
        navigation.navigate("ChallengePage", {challenge})
    }

    async function checkIfChallengeIsDone(challengeObj)
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
        
        //Check wether anyone has completed all challenges:
        for(let amountOfCompletedTasks in map)
        {
            const amountCompleted = map[amountOfCompletedTasks];
            if(amountCompleted == challengeObj.tasks.length)
            {
                //Ensure that you've not alredy seen the end page:
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
                    } else {
                        try{
                        await addSingleValueToDocument("Challenges", challengeObj.id, "isStilActive", false);
                        setHasFinishedChallenge(challengeObj);
                        
                    }catch(err){
                        console.log(err);
                    }
                }

                if(shouldYouSeeFinishScreen)
                {
                    try{
                        //? This very next line should maybe first happen when clicking continue of view leaderboard
                        await addToDocument("Challenges", challengeObj.id, "peopleSeenFinishScreen", global.userInformation.id, true); 
                        setHasFinishedChallenge(challengeObj);
                    }catch(err){
                        console.log(err);
                    }
                }
            }
        }
    }

    function goToFinishedChallenge(challenge)
    {
        //! Insert navigation to page
        console.log("Go To Finished Challenge!\n" + challenge.challengeName);
    }

    const [hasFinnishedChallenge, setHasFinishedChallenge] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [topThreeInformation, setTopThreeInformation] = useState(false);

    useEffect(() => {
        if(hasFinnishedChallenge)
        {
            const allPlayersAmountCompleted = calculatePlacement(hasFinnishedChallenge, false, false, true);
            const sortedEntries = Object.entries(allPlayersAmountCompleted).sort((a, b) => b[1] - a[1]);
            const sortedKeys = sortedEntries.map(entry => entry[0]);
            
            setLeaderboard(sortedKeys);
            console.log(sortedKeys);

            setIagesAndNames(sortedKeys);
        }

        async function setIagesAndNames(ids)
        {
            let arr = [] // [[n1, i1], [n2, i2], [n3, i3]]
            for(let id of ids.slice(0, 3))
            {
                const values = await returnImageAndNameFromID(id);
                arr.push(values);
            }

            setTopThreeInformation(arr);
            console.log(arr);
        }

    }, [hasFinnishedChallenge])

    async function returnImageAndNameFromID(id) //! Can diffently be improved (useState)
    {
        const standardProfilePic = "https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
        if(id == global.userInformation.id && global.userInformation.Username)
        {
            const profilePic = global.userInformation.ProfilePicture || standardProfilePic;
            console.log([global.userInformation.Username, profilePic])
            return [global.userInformation.Username, {uri : profilePic}];
        }else {
            try{
                const res = await readSingleUserInformation("Users", id);

                const profilPic = res.ProfilePicture || standardProfilePic;
                console.log([res.Username, profilPic])
                return [res.Username, {uri : profilPic}];

            }catch(err){
                console.error(err);
            }
        }
    }

    return(
        <View style={{flex: 1}}>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Home"} navigation={navigation} isOnHomePage={true} hasNotifications={amountOfNotifications}/>
            </View>


            <View style={[styles.wrapper, {flexDirection: 'row', overflow: "scroll", marginBottom: 12 }]}>
                <View style={{width: "100%",}}> 
                    <CreateChallengeComponent navigation={navigation} />
                </View>
                {allChallenges?.map((challenge, index) => (
                    <View key={index}>
                        {differenceInTime(challenge.startingTime) <= 0 && checkIfChallengeIsDone(challenge) && (
                            <View>
                                {challenge.isStilActive && (
                                        <View style={{width: "100%"}} key={index}>
                                            <CarouselItem title={challenge.challengeName} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
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


            {!hasFinnishedChallenge?.id ? (
                <></>
                ): (
                    <View style={{position: "absolute", left: 0, top: 0, right: 0, bottom: 0, backgroundColor: "#001D34", opacity: 0.9}}>
                        {leaderboard && topThreeInformation && (
                            <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-evenly"}}>
                                {leaderboard.length >= 3 && (
                                    <View>
                                        <Image source={topThreeInformation[1][1]}/>
                                        <Text style={[styles.whiteFontSize16]}>{topThreeInformation[1][0]}</Text>                                    
                                    </View>
                                )}
                                {leaderboard.length >= 1 && (
                                    <View>
                                        <Image source={topThreeInformation[0][1]}/>
                                        <Text style={[styles.whiteFontSize16]}>{topThreeInformation[0][0]}</Text>
                                    </View>
                                )}
                                {leaderboard.length >= 2 && (
                                    <View>
                                        <Image source={topThreeInformation[2][1]}/>
                                        <Text style={[styles.whiteFontSize16]}>{topThreeInformation[2][0]}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                        <View style={{flex: 1, alignItems: "center", marginTop: "100%"}}>
                            <Text style={[styles.whiteFontSize25, {}]}>Congrats!</Text>
                            <Text style={[styles.whiteFontSize16, {}]}>You Finished #{calculatePlacement(hasFinnishedChallenge, global.userInformation.id, false)} in {hasFinnishedChallenge.challengeName}</Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}
