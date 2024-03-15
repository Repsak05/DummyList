import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function ProfileUserInformation({username, email})
{
    //Extra values: Parameters
    const widthProgressbar = 135;
    const setHeight = 20;
    const xpToLevelUp = 200;
    const xpCurrent = 100;
    const levelCurrent = 9;

    return(
        <View style={[style.roundedCorners, {padding: "10%", backgroundColor: "#F8F9FF", width: "90%", height: "13.5%", alignSelf: "center", alignItems: "center", justifyContent: "space-between", flexDirection: "row", }]}>
            <View style={{flexDirection: "column"}}>
                <Text style={style.blackFontSize20}>@{username}</Text>
                <Text style={style.greyFontSize16}>{email}</Text>
            </View>

            <View style={{position: "relative"}}>
                <View style={{borderRadius: 15, position: "absolute", top: 0, right: 0, backgroundColor: "#F2E2C4", width: widthProgressbar, height: setHeight}}>
                    <View style={{borderRadius: 15, position: "relative", top: 0, left: 0, backgroundColor: "#0477BF", width: (widthProgressbar/xpToLevelUp*xpCurrent), height: setHeight}}></View>
                    <Text style={[style.blackFontSize10, {position: "absolute", left: "40%", top: "10%", }]}>Level {levelCurrent}</Text>
                </View>
            </View>
        </View>
    )
}