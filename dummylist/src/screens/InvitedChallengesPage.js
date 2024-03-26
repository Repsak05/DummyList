import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import CarouselItem from "../components/CarouselItem.js";

export default function InvitedChallengesPage({navigation})
{
    const challengesValues = [
        ["De Ekstreme Bananer", true],
        ["Home 404", false, "12 Hours"],
    ]

    function handlePressLeft()
    {
        console.log("Left has been pressed!");
        navigation.navigate("FriendsPage")
    }
    
    function handlePressRight()
    {
        console.log("Right has been pressed!");
        //Navigate to challenges requests
    }

    function challengeInviteClicked(arr)
    {
        console.log("Navigate to invited challenge")
        console.table(arr)
    }

    return(
        <View>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Challenges"} navigation={navigation}/>
            </View>


            <View style={{marginBottom: 17,}}>
                <SwitchButton startingStateIsLeft={false} onPressLeft={handlePressLeft} onPressRight={handlePressRight}/>
            </View>


            {challengesValues.map((arr, index) => (
                <Pressable onPress={challengeInviteClicked} key={index}>
                    <CarouselItem 
                    title={arr[0]} 
                    extraStylesToBackground={arr[1] ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : null} //Should be chaged
                    extraText={arr[1] ? "Not Accepted": arr[2] + "   "}
                    onPressFunction={() => challengeInviteClicked(arr)}
                    hasPlacement={false}/>
                </Pressable>
            ))}
        </View>
    )

}
