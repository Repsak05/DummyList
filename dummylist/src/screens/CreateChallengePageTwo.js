import React from "react";
import { View, ScrollView, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/progressBarTemplate.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";

export default function CreateChallengePageTwo({navigation})
{
    function nextPreviousFunction()
    {
        console.log("Go to next or previous!");
    }

    //Should be changed to be a parameter (together with image)
    const allAddedFriends = [ 
        ["Peter",   29, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Svend",   21, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Erik",    19, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Knud",    39, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Pete1r",  29, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Sven2d",  21, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Eri3k",   19, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Knu4d",   39, require("../assets/icons/exampleProfilePicture2.svg")],
    ];

    return(
        <View>
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header navigation={navigation} pageName={"Create Challenge"}/>
            </View>

            <View style={{alignSelf: "center", marginBottom: 127}}>
                <ProgressBarTemplate currentXp={2} maxXp={3} text={"2/3"} setWidth={400}/>
            </View>

            <View style={{paddingBottom: 36}}>
                <InputFieldWithBlueOutline  startingValue="Add Your Friends..."/>
            </View>

            <ScrollView style={{maxHeight: 370}}>
                {allAddedFriends.map(arr => (
                    <View key={arr[0]} style={{marginBottom: 11}}>
                        <AddFriends name={arr[0]} level={arr[1]} image={arr[2]}/>
                    </View>
                ))}
            </ScrollView>

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={nextPreviousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextPreviousFunction}/>
            </View>
        </View>
    )
}