import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function ProfileAchievements({typeNumber, value})
{
    const types = [
        {title : "Average Placement:",   image : require("../assets/icons/averagePlacement.svg"),    color : "#0477BF",  suffix : "Place"},
        {title : "Challenges Won:",     image : require("../assets/icons/challengesWon.svg"),       color : "#F2B705",  suffix : "Times"},
        {title : "Completed Tasks:",    image : require("../assets/icons/completedTasks.svg"),      color : "#A6290D",  suffix : "Tasks"},
        {title : "Times Participated:", image : require("../assets/icons/timesParticipated.svg"),   color : "#F2E2C4",  suffix : "Times"},
    ];

    return(
        <View style={[style.roundedCorners, {alignItems: "center", justifyContent: "space-around", flexDirection: "row", width: "48%", height: 78, backgroundColor: types[typeNumber-1].color}]}>
            <Image source={types[typeNumber-1].image} />

            <View style={{flexDirection: "column"}}>
                <Text style={style.blackFontSize13}>{types[typeNumber-1].title}</Text>
                <Text style={style.blackFontSize10}>{value % 1 == 0 ? value : value.toFixed(2)} {types[typeNumber-1].suffix}</Text>
            </View>

        </View>
    )
}