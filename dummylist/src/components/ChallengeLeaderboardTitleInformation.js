import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";
import Challenge from "../../Challenge";

export default function ChallengeLeaderboardTitleInformation({daysLeftTillChallengeEnds, isChallengeOrLeaderboard = true})
{
    return(
        <View style={{flexDirection: "column", width: "90%", alignSelf: "center"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%"}}>
                <Text style={style.blackFontSize20}>{isChallengeOrLeaderboard ? "Challenge" : "Leaderboard"}</Text>
                <Text style={style.blackFontSize20}>{daysLeftTillChallengeEnds} Days left</Text>
            </View>
            <View style={{width: "100%", height: 5, backgroundColor: "#32618D"}}></View>
        </View>
    )
}