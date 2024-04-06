import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";

export default function AcceptChallengeOverviewPage({navigation, ownsChallenge = false, challengeName = "De Ekstreme Bananer", gameMode = "Team-Mode", amountOfTasks = "12", friendsInvited = 12, friendsJoined = 8, taskDifficulty = "Medium", startinIn = 7, initialHasAccepted = false, intialHasAnswered = false})
{
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}


    const isOwnerOfChallenge = challenge.isOwner; //Add settings option in <Header/>
    const [hasAnswered, setHasAnswered] = useState(intialHasAnswered); //__Should prob be removed, or remade
    const [hasAcceptedOrDeclined, setHasAcceptedOrDeclined] = useState(challenge?.challenge?.friends?.some(friend => {
        if (friend.user === global.userInformation?.id) {
            return friend.hasJoined;
        }
    }) || false);

    let displayedImage;
    let setBackgroundColor;
    
    switch(challenge.challenge.gameMode)
    {
        case "Fastest Wins":
            displayedImage = require("../assets/icons/fastestWins.png");
            setBackgroundColor = "#A6290D";
            break;
        case "Bingo":
            displayedImage = require("../assets/icons/bingoIcon.png");
            setBackgroundColor = "#0477BF";
            break;
        case "Team-Mode":
            displayedImage = require("../assets/icons/teamModeIcon.png");
            setBackgroundColor = "#F2B705";
            break;
        case "Long List":
            displayedImage = require("../assets/icons/longListIcon.png");
            setBackgroundColor = "#F2E2C4";
            break;
        default:
            displayedImage = require("../assets/icons/deleteIcon.svg");
            setBackgroundColor = "#57C945";
            break;
    }

    const exampleProfilePicture = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
    const allFriendsInvited = [
        ["name1", exampleProfilePicture], ["name2", exampleProfilePicture], ["name3", exampleProfilePicture], ["name4", exampleProfilePicture], ["name5", exampleProfilePicture], ["name6", exampleProfilePicture], ["name7", exampleProfilePicture], ["name8", exampleProfilePicture], ["name9", exampleProfilePicture], ["name10", exampleProfilePicture],
    ]

    const allFiendsJoined = [
        "name1",  "name3", "name4",  "name5", "name6"
    ]


    

    return(
        <View>
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
                        <Text style={[style.blackFontSize16]}>Tasks: {amountOfTasks} • {challenge.challenge.taskDifficulty} Difficulty</Text>
                    </View>
                </View>
                
                <View style={{flexDirection: "column", marginBottom: 20}}>
                    <Text style={[style.blackFontSize20, {marginBottom: 11} ]}>People participating: {friendsJoined}/{challenge.challenge.friends.length}</Text>
                    <View style={{flexDirection: "row"}}>
                        {allFriendsInvited.map((arr, index) => (
                            <View key={index}>
                                <Image
                                    source={{uri: arr[1]}}
                                    style={{zIndex: allFriendsInvited.length - index, width: 45, height: 45, borderRadius: "50%", transform: [{translateX: -index*10}]}}
                                    imageStyle={{borderRadius: "50%"}}
                                />
                                {!allFiendsJoined.includes(arr[0]) && (
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

                        <Text style={[style.blackFontSize16Medium]}>{startinIn} Hours.</Text>
                        {!hasAnswered && !isOwnerOfChallenge && (
                            <Text style={[style.blackFontSize16]}> Do You Want to Accept? </Text>
                        )}
                        <Text></Text>
                    </View>

                    <View >
                        {!isOwnerOfChallenge && !hasAnswered ? (
                            <View style={{flexDirection: "row"}}>
                                <Pressable onPress={() => {setHasAnswered(true); setHasAcceptedOrDeclined(false)}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", marginRight: 13}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Decline Invite</Text>     
                                </Pressable>
                                <Pressable onPress={() => {setHasAnswered(true); setHasAcceptedOrDeclined(true)}} style={[style.roundedCornersSmall, {width: 185, height: 50, borderWidth: 5, borderColor: "#D0E4FF", justifyContent: "center"}]}>
                                    <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Accept Invite</Text>
                                </Pressable>
                            </View>
                        ): (
                            <View>
                                {!isOwnerOfChallenge && (
                                    <Pressable  onPress={() => {setHasAnswered(false); setHasAcceptedOrDeclined(null)}} style={[style.roundedCornersSmall, {width: 132, height: 50, borderWidth: 5, borderColor: "#775A0B", justifyContent: "center", alignContent: "center", }]}>
                                        <Text style={[style.blackFontSize16Medium, {textAlign: "center"}]}>Cancel</Text>
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}