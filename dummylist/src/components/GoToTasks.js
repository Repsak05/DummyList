import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function GoToTasks({completeChallenges, allChallenges})
{
    const setHeight = 20;
    const totalProgressBarWidth = 200;
    const edgdeOnProgressBarSize = 0;

    function onClickGoToTasks(){
        console.log("Should go to Task page now")
    }

    return(
        <View style={[style.goToLeaderboardBackground, style.displayRow, style.centerVeritically, style.centerHorzontally]} >
            <View style={[style.displayColumn, {marginRight: 100, }]}>
                    <Text style={style.blackFontSize20}>Challenges done:</Text>
                    <View style={{position: 'relative'}}>
                        <View style={{borderRadius: 15, position: 'absolute', top: 0, left: 0, width: totalProgressBarWidth, height: setHeight, backgroundColor: "#F2E2C4"}} ></View>
                        <View style={{borderRadius: 15, position: 'absolute', top: edgdeOnProgressBarSize, left: edgdeOnProgressBarSize, width: (totalProgressBarWidth/allChallenges.length*completeChallenges.length)-2*edgdeOnProgressBarSize, height: setHeight-2*edgdeOnProgressBarSize, backgroundColor: "#0477BF"}}></View>
                        <Text style={[style.darkBlueFontSize13, {position: 'absolute', top: 0, left: "50%"}]}>{completeChallenges.length}/{allChallenges.length}</Text>
                    </View>
            </View>

            <TouchableOpacity style={[style.displayRow, style.centerVeritically]}onPress={onClickGoToTasks}>
                <Text style={[style.blackFontSize13, {marginRight: 10, width: 65}]}>See all challenges</Text>
                <Image source={require("../assets/icons/rightArrow.svg")} />
            </TouchableOpacity>

        </View>
    )

}