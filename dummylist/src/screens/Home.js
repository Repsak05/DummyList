import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";
import { readDataWithQuery, addSingleValueToDocument } from "../../firebase.js";
import { differenceInTime } from "../components/GlobalFunctions.js";

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

            console.log(amountCompleted);
            if(amountCompleted == challengeObj.tasks.length)
            {
                console.log("Someone has completed this challenge");

                //Insert finished status in DB
                try{
                    await addSingleValueToDocument("Challenges", challengeObj.id, "isStilActive", false);
                    
                }catch(err){
                    console.log(err);
                }
            }
        }
    }

    function goToFinishedChallenge(challenge)
    {
        //! Insert navigation to page
        console.log("Go To Finished Challenge!\n" + challenge.challengeName);
    }

    return(
        <View>
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
                                {challenge.isStilActive 
                                    ? (
                                        <View style={{width: "100%"}} key={index}>
                                            <CarouselItem title={challenge.challengeName} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
                                        </View>

                                    ) : (
                                        <Pressable onPress={() => goToFinishedChallenge(challenge)} >
                                            {/* //! THIS SHOULD BE REMADE  */}
                                            <CarouselItem title={challenge.challengeName} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
                                            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", opacity: 0.5}}></View>
                                            <Text style={[styles.whiteFontSize25, {position: "absolute", top: "30%", left:"27%"}]}>Finished - View Results</Text>
                                        </Pressable>
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
        </View>
    )
}
