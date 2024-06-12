import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";
import { readData, readDataWithQuery } from "../../firebase.js";
import { differenceInTime } from "../components/GlobalFunctions.js";

export default function Home({navigation})  
{   //TODO: Fix background colors on create challenge and active challenges
    //TODO: Create placement icon with just 1/2 and 2/2
    //!Test 

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
                        {differenceInTime(challenge.startingTime) <= 0 && (
                            <View style={{width: "100%"}} key={index}>
                                <CarouselItem title={challenge.challengeName} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
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
