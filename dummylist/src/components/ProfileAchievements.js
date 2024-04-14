import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function ProfileAchievements({typeNumber, value})
{
    const types = [
        ["Average Placement:",  require("../assets/icons/averagePlacement.svg"),    "#0477BF"       , "Place"],
        ["Challenges Won:",     require("../assets/icons/challengesWon.svg"),       "#F2B705"       , "Times"],
        ["Completed Tasks:",    require("../assets/icons/completedTasks.svg"),      "#A6290D"       , "Tasks"],
        ["Times Participated",  require("../assets/icons/timesParticipated.svg"),   "#F2E2C4"       , "Times"],
    ]
    return(
        <View style={[style.roundedCorners, {alignItems: "center", justifyContent: "space-around", flexDirection: "row", width: "48%", height: 78, backgroundColor: types[typeNumber-1][2]}]}>
            <Image source={types[typeNumber-1][1]} />

            <View style={{flexDirection: "column"}}>
                <Text style={style.blackFontSize13}>{types[typeNumber-1][0]}</Text>
                <Text style={style.blackFontSize10}>{value} {types[typeNumber-1][3]}</Text>
            </View>

        </View>
    )
}