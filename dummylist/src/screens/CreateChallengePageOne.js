import React, {useEffect, useState} from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import ChooseGameModeTypeBoxes from "../components/ChooseGameModeTypeBoxes.js";
import NextPreviousButton from "../components/NextPreviousButton.js";

export default function CreateChallengePageOne({navigation, route})
{
    const { allCurrentChallengeValues } = route.params || {}; //?Was set to 0 before (havent been tested since)      

    const [allChallengeValues, setAllChallengeValues] = useState(allCurrentChallengeValues || {
        challengeName: "",
        gameMode: "",
        startingTime: 24, //This is not how its being set (Being done later (pageTwo))
        amountOfTasks: 5,
        taskDifficulty: "",
    })

    const [numberOfPages, setNumberOfPages] = useState(3);

    useEffect(() => { //Ajust how many pages is needed to be filled out
        if(allChallengeValues.gameMode == "Team-Mode"){
            setNumberOfPages(4);
        }else {
            setNumberOfPages(3);
        }

    }, [allChallengeValues])

    function changeChallengeValues(value, name)
    {
        setAllChallengeValues({
            ...allChallengeValues,
            [name] : value
        })
    }

    function previousFunction()
    {
        console.log("Go to Previos!");
        navigation.navigate("Home")
    }
          
    function nextFunction()
    {
        if(!allChallengeValues.challengeName)
        {
            const endValue = {
                ...allChallengeValues,
                "challengeName" : Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000)
            }

            console.log("endValue")
            console.log(endValue)
            navigation.navigate("CreateChallengePageTwo", {
                allChallengeValues : endValue
            })
        } else {

            console.log("Go to next!");
            console.log(allChallengeValues)

            navigation.navigate("CreateChallengePageTwo", {
                allChallengeValues
            })
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}> 
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header navigation={navigation} pageName={"Create Challenge"}/>
            </View>

            <View style={{alignSelf: "center", marginBottom: 127}}>
                <ProgressBarTemplate currentXp={1} maxXp={numberOfPages} text={"1/" +numberOfPages} setWidth={400}/>
            </View>

            <InputFieldWithBlueOutline onChange={(e) => changeChallengeValues(e.target.value, "challengeName")} startingValue="Enter Challenge Name"/>

            <View style={{marginTop: 20, flexDirection: "column", }}>
                <View style={{flexDirection: "row", marginBottom: 12, justifyContent: "space-around"}}>
                    <ChooseGameModeTypeBoxes addStyle={allChallengeValues.gameMode === "Fastest Wins"   || allChallengeValues.gameMode == "" ? style.isPicked : style.isNotPicked} onPress={(title) => changeChallengeValues(title, "gameMode")} colorType={1} image={require("../assets/icons/fastestWins.png")}   title={"Fastest Wins"}  subtitle={"Be the First to Complete All Tasks"}/>
                    <ChooseGameModeTypeBoxes addStyle={allChallengeValues.gameMode === "Bingo"          || allChallengeValues.gameMode == "" ? style.isPicked : style.isNotPicked} onPress={(title) => changeChallengeValues(title, "gameMode")} colorType={2} image={require("../assets/icons/bingoIcon.png")}     title={"Bingo"}         subtitle={"Play on a Bingo Board"}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <ChooseGameModeTypeBoxes addStyle={allChallengeValues.gameMode === "Team-Mode"      || allChallengeValues.gameMode == "" ? style.isPicked : style.isNotPicked} onPress={(title) => changeChallengeValues(title, "gameMode")} colorType={3} image={require("../assets/icons/teamModeIcon.png")}  title={"Team-Mode"}     subtitle={"Compete in Teams"}/>
                    <ChooseGameModeTypeBoxes addStyle={allChallengeValues.gameMode === "Long List"      || allChallengeValues.gameMode == "" ? style.isPicked : style.isNotPicked} onPress={(title) => changeChallengeValues(title, "gameMode")} colorType={4} image={require("../assets/icons/longListIcon.png")}  title={"Long List"}     subtitle={"Complete as Many as Possible"}/>
                </View>
            </View>
            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Cancel"} onPress={previousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextFunction}/>
            </View>
        </View>
    )
}