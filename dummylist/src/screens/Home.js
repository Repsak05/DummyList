import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 
import colors from "../colors.js";

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";

import { readData } from "../../firebase.js";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation.js";

export default function Home({navigation})  //TODO: Ajust carouselItem's value: isPlacedInTheMiddle={true/false} (Depending on placement in array)
{   //TODO: Fix background colors on create challenge and active challenges
    const [amountOfNotifications, setAmountOfNotifications] = useState(0);
    const [allChallenges, setAllChallenges] = useState()

    useEffect(() => { //Ensures correct amountOfNotifications
        if(amountOfNotifications == 0)
        {
            setAmountOfNotifications(false)
        }
    }, [amountOfNotifications])

    useEffect(() => {
        async function getAllYourChallenges()
        {
            try{
                let yourChallenges = []
                const res = await readData("Challenges")
                
                res.map(challenge => {
                    if(challenge.friends && challenge.isStilActive){
                        challenge.friends.map(friend => {
                            if(friend.user == global.userInformation.id){
                                yourChallenges.push(challenge)
                            }
                        })
                    }
                })
                console.log(yourChallenges)
                setAllChallenges(yourChallenges)
            } catch(err){
                console.error(err);
            }
        }

        getAllYourChallenges();
    }, [])

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
                {allChallenges?.map((challenge, index) => {
                    return(
                        <View style={{width: "100%"}} key={index}>
                            <CarouselItem title={challenge.challengeName} isPlacedInTheMiddle={index != (allChallenges.length -1)} onPressFunction={() => navigateToChallenge(challenge)} navigation={navigation}/>
                        </View>
                    )
                })}
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
