import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";
import ProgressBarTemplate from "./ProgressBarTemplate"

export default function GoToTasks({completeChallenges, allChallenges, propsToTask, navigation})
{

    function onClickGoToTasks(){
        console.log("Should go to Task page now")
        navigation.navigate('ChallengePage', {challenge: propsToTask})
    }

    return(
        <View style={[style.goToLeaderboardBackground, style.displayRow, style.centerVeritically, style.centerHorzontally, {alignSelf: "center", height: 124}]} >
            <View style={[style.displayColumn, {marginRight: 30, }]}>
                    <Text style={style.blackFontSize20}>Challenges done:</Text>
                    <ProgressBarTemplate text={completeChallenges + "/" + allChallenges} maxXp={allChallenges} currentXp={completeChallenges} setWidth={200} setHeight={20}/>
            </View>

            <Pressable style={[style.displayRow, style.centerVeritically]}onPress={onClickGoToTasks}>
                <Text style={[style.blackFontSize13, {marginRight: 10, width: 65}]}>See all challenges</Text>
                <Image source={require("../assets/icons/rightArrow.svg")} />
            </Pressable>

        </View>
    )

}