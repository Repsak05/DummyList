import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import ProgressBarTemplate from "./progressBarTemplate";
export default function ProfileUserInformation({username, email})
{
    //Extra values: Parameters
    const widthProgressbar = 135;
    const setHeight = 20;
    const xpToLevelUp = 200;
    const xpCurrent = 100;
    const levelCurrent = 9;

    return(
        <View style={[style.roundedCorners, {padding: "10%", backgroundColor: "#F8F9FF", width: "90%", height: 124, alignSelf: "center", alignItems: "center", justifyContent: "space-between", flexDirection: "row", }]}>
            <View style={{flexDirection: "column"}}>
                <Text style={style.blackFontSize20}>@{username}</Text>
                <Text style={style.greyFontSize16}>{email}</Text>
            </View>

            <View style={{marginLeft: 40}}>
                <ProgressBarTemplate setWidth={widthProgressbar} height={setHeight} currentXp={xpCurrent} maxXp={xpToLevelUp} text={"Level " + levelCurrent} textStyle={style.blackFontSize10}/>
            </View>
        </View>
    )
}