import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import EnterTaskDescription from "../components/EnterTaskDescription.js";

import { addSingleValueToDocument, addToDocument, updateArrayFieldInDocument } from "../../firebase.js";
import { differenceInTime, getProfilePic } from "../components/GlobalFunctions.js";
import { defaultImage } from "../defaultValues.js";

export default function AcceptChallengeOverviewPage({ navigation })
{ 
    //TODO: If there's more than 9 tasks in a challenge, then it should be scrollable
    //TODO: When clicking on the yes/no button - add/remove from joinedMembers
    //TODO: Initial "Accept-" / "Decline invite" based on correct array (joinedMembers)
    //TODO: If isOwnerOfChallenge then add edit options
    //! Remove ability to add tasks if its a Bingo - Or add it, and only the rest should be random
    //TODO: Start Early button looks bad - refine its styling
    //! On start early: In case of long list (time limit) - the ending time should be ajusted to fit the chosen duration
    //!If gameMode is TeamMode: And you a have alredy joined a team but decide to cancel, it should remove you from your team
  
    const route = useRoute();
    const {chal} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}

    const ifTeamModeAndAccepted = chal.isAccepted || false;
    const [challenge, setChallenge] = useState(chal);
    

    const [allTasks, setAllTasks] = useState([]);
    
    useEffect(() => {
        let tasks = [];

        const thisChallenge = challenge.challenge;
        const tasksInformation = thisChallenge.tasks;
        
        for(let eachTask of tasksInformation)
        {
            tasks.push({taskDescription : eachTask.taskDescription, homemade : eachTask.homemade || false});
        }

        setAllTasks(tasks);
    }, [])

    useEffect(() => {
        if(ifTeamModeAndAccepted && challenge.challenge.gameMode == "Team-Mode")
        {
            tAreYouParticipating(true);
        }

    }, [ifTeamModeAndAccepted])

    function tStartingStatus() //Check wether you have accepted
    {
        for(members of challenge.challenge.joinedMembers){
            if(members == global.userInformation.id){
                return true;
            }
        }
        return false;
    }

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(tStartingStatus());

    const [hasAcceptedOrDeclined, setHasAcceptedOrDeclined] = useState(tStartingStatus());

    let challengeIconBackground = {
        "Fastest Wins" :    {displayedImage : require("../assets/icons/fastestWins.png"),   setBackgroundColor: "#A6290D" },
        "Bingo" :           {displayedImage : require("../assets/icons/bingoIcon.png"),     setBackgroundColor: "#0477BF" },
        "Team-Mode" :       {displayedImage : require("../assets/icons/teamModeIcon.png"),  setBackgroundColor: "#F2B705" },
        "Long List" :       {displayedImage : require("../assets/icons/longListIcon.png"),  setBackgroundColor: "#F2E2C4" },
    }
    
    let displayedImage          = challengeIconBackground[challenge.challenge.gameMode]?.displayedImage     || require("../assets/icons/deleteIcon.svg");
    let setBackgroundColor      = challengeIconBackground[challenge.challenge.gameMode]?.setBackgroundColor || "#57C945";

    async function tAreYouParticipating(ans) //Accept of decline
    {
        //Send to other page to accept if TeamMode
        if(challenge.challenge.gameMode == "Team-Mode")
        {
            if(ans && !ifTeamModeAndAccepted)
            {
                ans = false;

                navigation.navigate("JoinTeamModeChallenge", {
                    challenge
                });
                
                return;
            }
        }

        //Update participating answer
        try{
            await updateArrayFieldInDocument("Challenges", challenge.challenge.id, "joinedMembers", global.userInformation.id, ans)

            //Update current displayed info right away - so it doesnt have to load new info from db:
            let theNewArr = challenge.challenge.joinedMembers;
            
            if(ans){
                theNewArr.push(global.userInformation.id);

            } else {
                for(let i = 0; i < challenge.challenge.joinedMembers.length; i++)
                {
                    if(challenge.challenge.joinedMembers[i] == global.userInformation.id)
                    {
                        theNewArr.splice(i, 1);
                        break;
                    }
                }
            }

            setChallenge(prevChallenge => ({
                ...prevChallenge,
                challenge : {
                    ...prevChallenge.challenge,
                    joinedMembers : theNewArr
                }
            }))
        } catch(err){
            console.log(err);
        }
    }

    async function addTaskToChallenge(taskDescription)
    {
        console.log("Task: " + taskDescription + " <-- Is being added");
        
        //Find out which members is participating
        let membersID = [];
        const allInvitedMembers = challenge.challenge.invitedMembers;
        
        for(let id of allInvitedMembers)
        {
            //Add each player ID and set them not to have Completed The New Task to array membersID 
            membersID.push({friendID : id, hasCompletedTask : false});
        }

        //Create tasks. object structure
        const newTaskObject = {taskDescription : taskDescription, friendsTask : membersID, homemade: true };

        try{
            //Add the new object to the DB
            await addToDocument("Challenges", challenge.challenge.id, "tasks", newTaskObject, true);
            console.log("Task added!");

            //Make new task display on screen instantaneously                  
            setAllTasks([...allTasks, { taskDescription: taskDescription, homemade: true }]);
        }catch(err){
            console.error(err);
        }
    }

    function checkWetherMembersHasJoined(memberID)
    {
        for(let members in challenge.challenge.joinedMembers)
        {
            const member = challenge.challenge.joinedMembers[members];
            if(member == memberID){
                return true;
            }
        }
        return false;
    }

    const [profilePics, setProfilePics] = useState({});

    useEffect(() => {
       //Get all pictures of people in the challenge
        async function fetchProfilePics()
        {
            let pics = {};

            for (let member of challenge.challenge.invitedMembers) {
                pics[member] = await getProfilePic(member) || defaultImage;
            }
            setProfilePics(pics);
        }

        fetchProfilePics();
    }, [challenge]);

    const [textInputToCreateNewChallenge, setTextInputToCreateNewChallenge] = useState("");

    async function startNow()
    {
        try{
            const newStartingTime = new Date();
            await addSingleValueToDocument("Challenges", challenge.challenge.id, "startingTime", newStartingTime);
            navigation.navigate("Home");

        }catch(err){
            console.log(err);
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={[{marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Challenges"} navigation={navigation} navigateToPage={"InvitedChallengesPage"}/>
            </View>

            <CarouselItem onPressFunction={() => console.log("Do Nothing")} hasPlacement={false} title={false}/>

            <View style={{marginLeft: 36}}>
                <Text style={[style.blackFontSize25, {marginTop: 20, marginBottom: 8}]}>{challenge.challenge.challengeName}</Text>

                <View style={{flexDirection: "row", marginBottom: 20}}>
                    <View style={[style.roundedCornersSmall, {width: 60, height: 60, backgroundColor: setBackgroundColor, justifyContent: 'center', alignItems: "center", marginRight: 14}]}>
                        <Image style={[{width: 45, height: 45}]} source={displayedImage}/>
                    </View>

                    <View style={{flexDirection: "column"}}>
                        <Text style={[style.blackFontSize20]}>{challenge.challenge.gameMode}</Text>
                        <Text style={[style.blackFontSize16]}>Tasks: {challenge.challenge.amountOfTasks} • {challenge.challenge.taskDifficulty || "Medium"} Difficulty</Text>
                    </View>
                </View>
                
                <View style={{flexDirection: "column", marginBottom: 20}}>
                    <Text style={[style.blackFontSize20, {marginBottom: 11} ]}>People participating: {challenge.challenge.joinedMembers.length}/{challenge.challenge.invitedMembers.length}</Text>
                    <View style={{flexDirection: "row"}}>
                        {challenge.challenge.invitedMembers.map((member, index) => (
                            <View key={index}>
                                <Image
                                    source={profilePics[member]}
                                    style={{zIndex: challenge.challenge.invitedMembers.length - index, width: 45, height: 45, backgroundColor: "#268", borderRadius: "50%", transform: [{translateX: -index*10}]}}
                                    imageStyle={{borderRadius: "50%"}}
                                />
                                {!checkWetherMembersHasJoined(member) && (
                                    <View style={{zIndex: 12, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', width: 45, height: 45, borderRadius: "50%", transform: [{translateX: -index*10}]}}></View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{flexDirection: "column", }}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row", marginBottom: 5}}>

                            {hasAnswered && hasAcceptedOrDeclined && !challenge.isOwner &&(
                                <Text style={[style.blackFontSize16]}>You've Accepted! </Text>
                            )}
                            <Text style={[style.blackFontSize16]}>This Challenge Starts in </Text>

                            <Text style={[style.blackFontSize16Medium]}>{differenceInTime(challenge.challenge.startingTime).toFixed(2)} Hours.</Text>
                            {!hasAnswered && !challenge.isOwner && (
                                <Text style={[style.blackFontSize16]}> Do You Want to Accept? </Text>
                            )}
                        </View>

                        {challenge.isOwner && challenge.challenge.joinedMembers.length >= 2 && (
                            <Pressable onPress={startNow} style={[style.roundedCornersSmall, {marginRight: 50, borderWidth: 2, borderColor: "#3A8453", paddingHorizontal: 10}]}>
                                <Text style={style.blackFontSize16}>Start Early</Text>
                            </Pressable>

                        )}
                    </View>

                    <View >
                        {!challenge.isOwner && !hasAnswered ? (
                            <View style={{flexDirection: "row"}}>
                                <Pressable onPress={() => {tAreYouParticipating(false); setHasAnswered(true); setHasAcceptedOrDeclined(false);}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", marginRight: 13}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Decline Invite</Text>     
                                </Pressable>
                                <Pressable onPress={() => {tAreYouParticipating(true); setHasAnswered(true); setHasAcceptedOrDeclined(true); }} style={[style.roundedCornersSmall, {width: 185, height: 50, borderWidth: 5, borderColor: "#D0E4FF", justifyContent: "center"}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Accept Invite</Text>
                                </Pressable>
                            </View>
                        ): (
                            <View>
                                {!challenge.isOwner && (
                                    <Pressable  onPress={() => {setHasAnswered(false); setHasAcceptedOrDeclined(null); tAreYouParticipating(false);}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", alignContent: "center", }]}>
                                        <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Cancel</Text>
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>


            <View style={[style.roundedCorners, {marginHorizontal: 12, backgroundColor: "#D0E4FF", paddingHorizontal: 20, paddingBottom: 10, marginTop: 30}]}>
                <Text style={[style.blackFontSize20, {marginVertical: 11, }]}>Tasks ({allTasks?.length})</Text>
                
                <Pressable  onPress={() => setIsAddTaskOpen(true)} style={{position: "absolute", right: 10, top: 10}}>
                    <Text style={[style.blackFontSize16]}>+</Text>
                </Pressable>

                <View style={[{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}]}>
                    {allTasks?.map((task, index) => (
                        <Pressable onPress={() => {console.log("Open stuff");}} key={index} style={[, {borderRadius: 15, backgroundColor: task.homemade ? "#FFDF9D" : "#32618D", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", width: 100, height: 30, alignItems: "center", overflow: "hidden", marginBottom: 10}]}>
                            <Text numberOfLines={1} style={[style.blackFontSize10, {width: 60, heigth: 15, color: task.homemade ? "#251A00" :  "#FFFFFF", marginLeft: 11, flexWrap: "nowrap"}]}>{task.taskDescription}</Text>
                            
                            <Pressable onPress={() => {console.log("Should be removed");}} style={{marginRight: 10}}>
                                <Text style={{color : task.homemade ? "#251A00" :  "#FFFFFF"}}>X</Text>
                            </Pressable>
                        </Pressable>
                    ))}

                </View>

                <Text style={{marginTop: 6, textAlign:"center"}}>  - - + (Image)</Text>
            </View>


            {isAddTaskOpen && (
                <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: "center", alignItems: "center" }}>
                    <EnterTaskDescription
                        onPressCancel={() => setIsAddTaskOpen(false)}
                        onPressAccept={() => { console.log("Add task"); setIsAddTaskOpen(false); addTaskToChallenge(textInputToCreateNewChallenge)}}
                        onChangeText={(e) => {setTextInputToCreateNewChallenge(e);}}
                        value={textInputToCreateNewChallenge}
                    />
                </View>
            )}

        </View>
    );
}