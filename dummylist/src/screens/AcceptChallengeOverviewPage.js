import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import EnterTaskDescription from "../components/EnterTaskDescription.js";

import { addToDocument, updateArrayFieldInDocument } from "../../firebase.js";
import { differenceInTime } from "../components/GlobalFunctions.js";

export default function AcceptChallengeOverviewPage({ navigation })
{ //TODO: If there's more than 9 tasks in a challenge, then it should be scrollable
  //TODO: When clicking on the yes/no button - add/remove from joinedMembers
  //TODO: Initial "Accept-" / "Decline invite" based on correct array (joinedMembers)

  
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}

    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        let tasks = [];

        const thisChallenge = challenge.challenge;
        const tasksInformation = thisChallenge.tasks;
        
        for(let eachTask of tasksInformation)
        {
            //TODO: isMadeByYourself needs to be set correctly
            tasks.push({taskDescription : eachTask.taskDescription, isMadeByYourself : false});
        }

        setAllTasks(tasks);
    }, [])

    function startingStatus() //Check wether you have accepted
    {
        for (let member in challenge.challenge.friends)
        {
            let mem = challenge.challenge.friends[member];
            if( global.userInformation.id == mem.user){
                return mem.hasJoined
            }
        }
    }

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const isOwnerOfChallenge = challenge.isOwner; //Add settings option in <Header/>
    const [hasAnswered, setHasAnswered] = useState(startingStatus()); //__Should prob be removed, or remade
    const [hasAcceptedOrDeclined, setHasAcceptedOrDeclined] = useState(challenge?.challenge?.friends?.some(friend => {
        if (friend.user === global.userInformation?.id) {
            return friend.hasJoined;
        }
    }) || false);

    let challengeIconBackground = {
        "Fastest Wins" :    {displayedImage : require("../assets/icons/fastestWins.png"),   setBackgroundColor: "#A6290D" },
        "Bingo" :           {displayedImage : require("../assets/icons/bingoIcon.png"),     setBackgroundColor: "#0477BF" },
        "Team-Mode" :       {displayedImage : require("../assets/icons/teamModeIcon.png"),  setBackgroundColor: "#F2B705" },
        "Long List" :       {displayedImage : require("../assets/icons/longListIcon.png"),  setBackgroundColor: "#F2E2C4" },
    }
    
    let displayedImage     = challengeIconBackground[challenge.challenge.gameMode].displayedImage     || require("../assets/icons/deleteIcon.svg")
    let setBackgroundColor = challengeIconBackground[challenge.challenge.gameMode].setBackgroundColor ||"#57C945"
    const exampleProfilePicture = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"

    function amountJoined()
    {
        let amountJoined = 0;
        for (let member in challenge.challenge.friends)
        {
            let mem = challenge.challenge.friends[member];

            if(mem.hasJoined){
                amountJoined++;
            }
        }
        return amountJoined;
    }

    async function areYouParticipating(ans){
        for (let member in challenge.challenge.friends){
            let mem = challenge.challenge.friends[member];
            if( global.userInformation.id == mem.user){
                mem.hasJoined = ans;

                console.log(mem.hasJoined)
            }
        }

        try{
            await addToDocument("Challenges", challenge.challenge.id, "friends", challenge.challenge.friends, false)
            console.log(challenge.challenge)
        } catch (err){
            console.error(err)
        }
    }

    async function tAreYouParticipating(ans)
    {
        try{
            await updateArrayFieldInDocument("Challenges", challenge.challenge.id, "joinedMembers", global.userInformation.id, ans)
        } catch(err){
            console.log(err);
        }
    }

    async function addTaskToChallenge(taskDescription)
    {
        console.log("Task: " + taskDescription + " <-- Is being added");
        
        //Find out which members is participating
        let membersID = [];
        const friendsInChallenge = challenge.challenge.friends;
        
        for(let friends of friendsInChallenge)
        {
            //Add each player ID and set them not to have Completed The New Task to array membersID 
            membersID.push({friendID : friends.user, hasCompletedTask : false});
        }

        //Create tasks. object structure
        const newTaskObject = {taskDescription : taskDescription, friendsTask : membersID};

        try{
            //Add the new object to the DB
            await addToDocument("Challenges", challenge.challenge.id, "tasks", newTaskObject, true);
            console.log("Task added!");

            //Make it display on screen instantaneously
            setAllTasks([...allTasks, { taskDescription: taskDescription, isMadeByYourself: false }]);
        }catch(err){
            console.error(err);
        }
    }

    async function incrementTimesParticipatedStats(incrementValue)
    {
        try{
            await addToDocument("Users", global.userInformation.id, "Stats", false, false, incrementValue, "TimesParticipated");

        }catch(err){
            console.error(err);
        }
    }



    const [textInputToCreateNewChallenge, setTextInputToCreateNewChallenge] = useState("");

    return(
        <View style={{flex: 1}}>
            <View style={[{marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Challenges"} navigation={navigation}/>
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
                        <Text style={[style.blackFontSize16]}>Tasks: {challenge.challenge.amountOfTasks} • {challenge.challenge.taskDifficulty} Difficulty</Text>
                    </View>
                </View>
                
                <View style={{flexDirection: "column", marginBottom: 20}}>
                    <Text style={[style.blackFontSize20, {marginBottom: 11} ]}>People participating: {amountJoined()}/{challenge.challenge.friends.length}</Text>
                    <View style={{flexDirection: "row"}}>
                        {challenge.challenge.friends.map((participant, index) => (
                            <View key={index}>
                                <Image
                                    source={{uri: exampleProfilePicture}}
                                    style={{zIndex: challenge.challenge.friends.length - index, width: 45, height: 45, borderRadius: "50%", transform: [{translateX: -index*10}]}}
                                    imageStyle={{borderRadius: "50%"}}
                                />
                                {!participant.hasJoined && (
                                    <View style={{zIndex: 12, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', width: 45, height: 45, borderRadius: "50%", transform: [{translateX: -index*10}]}}></View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{flexDirection: "column", }}>
                    <View style={{flexDirection: "row", marginBottom: 5}}>

                        {hasAnswered && hasAcceptedOrDeclined && !isOwnerOfChallenge &&(
                            <Text style={[style.blackFontSize16]}>You've Accepted! </Text>
                        )}
                        <Text style={[style.blackFontSize16]}>This Challenge Starts in </Text>

                        <Text style={[style.blackFontSize16Medium]}>{differenceInTime(challenge.challenge.startingTime).toFixed(2)} Hours.</Text>
                        {!hasAnswered && !isOwnerOfChallenge && (
                            <Text style={[style.blackFontSize16]}> Do You Want to Accept? </Text>
                        )}
                    </View>

                    <View >
                        {!isOwnerOfChallenge && !hasAnswered ? (
                            <View style={{flexDirection: "row"}}>
                                <Pressable onPress={() => {setHasAnswered(true); setHasAcceptedOrDeclined(false); areYouParticipating(false); tAreYouParticipating(false)}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", marginRight: 13}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Decline Invite</Text>     
                                </Pressable>
                                <Pressable onPress={() => {setHasAnswered(true); setHasAcceptedOrDeclined(true);  areYouParticipating(true); tAreYouParticipating(true); incrementTimesParticipatedStats(1);}} style={[style.roundedCornersSmall, {width: 185, height: 50, borderWidth: 5, borderColor: "#D0E4FF", justifyContent: "center"}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Accept Invite</Text>
                                </Pressable>
                            </View>
                        ): (
                            <View>
                                {!isOwnerOfChallenge && (
                                    <Pressable  onPress={() => {setHasAnswered(false); if(hasAcceptedOrDeclined){incrementTimesParticipatedStats(-1);} setHasAcceptedOrDeclined(null); areYouParticipating(false); tAreYouParticipating(false);}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", alignContent: "center", }]}>
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
                        <Pressable onPress={() => {console.log("Open stuff");}} key={index} style={[, {borderRadius: 15, backgroundColor: task.isMadeByYourself ? "#FFDF9D" : "#32618D", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", width: 100, height: 30, alignItems: "center", overflow: "hidden", marginBottom: 10}]}>
                            <Text numberOfLines={1} style={[style.blackFontSize10, {width: 60, heigth: 15, color: task.isMadeByYourself ? "#251A00" :  "#FFFFFF", marginLeft: 11, flexWrap: "nowrap"}]}>{task.taskDescription}</Text>
                            
                            <Pressable onPress={() => {console.log("Should be removed");}} style={{marginRight: 10}}>
                                <Text style={{color : task.isMadeByYourself ? "#251A00" :  "#FFFFFF"}}>X</Text>
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