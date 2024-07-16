import React from "react";
import { View, Text } from 'react-native';
import style from "../style";

export default function ChallengeLeaderboardTitleInformation({daysLeftTillChallengeEnds, isChallengeOrLeaderboard = "Challenge", otherText = false})
{
    const message = daysLeftTillChallengeEnds ? daysLeftTillChallengeEnds + " Days left" : otherText;
    return(
        <View style={{flexDirection: "column", width: "90%", alignSelf: "center"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%"}}>
                <Text style={style.blackFontSize20}>{isChallengeOrLeaderboard}</Text>
                <Text style={style.blackFontSize20}>{message}</Text>
            </View>
            <View style={{width: "100%", height: 5, backgroundColor: "#32618D"}}></View>
        </View>
    )
}