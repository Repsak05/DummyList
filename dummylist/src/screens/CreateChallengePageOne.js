import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/progressBarTemplate.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import ChooseGameModeTypeBoxes from "../components/ChooseGameModeTypeBoxes.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
// import TaskComponent from "../components/TaskComponent.js"; -> ___Create new component (More generalizable)

export default function CreateChallengePageOne()
{

    function chosenGameMode()
    {
        console.log("GameMode has been chosen!");
    }

    function nextPreviousFunction()
    {
        console.log("Go to next or previous!");
    }
    return(
        <View> 
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header pageName={"Create Challenge"}/>
            </View>

            <View style={{alignSelf: "center", marginBottom: 127}}>
                <ProgressBarTemplate currentXp={1} maxXp={3} text={"1/3"} setWidth={400}/>
            </View>

            <InputFieldWithBlueOutline  startingValue="Enter Challenge Name"/>

            <View style={{marginTop: 20, marginBottom: 15, flexDirection: "column", }}>
                <View style={{flexDirection: "row", marginBottom: 12, justifyContent: "space-around"}}>
                    <ChooseGameModeTypeBoxes onPress={chosenGameMode} colorType={1} image={require("../assets/icons/fastestWins.png")} title={"Fastest Wins"} subtitle={"Be the First to Complete All Tasks"}/>
                    <ChooseGameModeTypeBoxes onPress={chosenGameMode} colorType={2} image={require("../assets/icons/bingoIcon.png")} title={"Bingo"} subtitle={"Play on a Bingo Board"}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <ChooseGameModeTypeBoxes onPress={chosenGameMode} colorType={3} image={require("../assets/icons/teamModeIcon.png")} title={"Team-Mode"} subtitle={"Compete in Teams"}/>
                    <ChooseGameModeTypeBoxes onPress={chosenGameMode} colorType={4} image={require("../assets/icons/longListIcon.png")} title={"Long List"} subtitle={"Complete as Many as Possible"}/>
                </View>
            </View>
            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row"}}>
                <NextPreviousButton text={"Previous"} onPress={nextPreviousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextPreviousFunction}/>
            </View>
        </View>
    )
}