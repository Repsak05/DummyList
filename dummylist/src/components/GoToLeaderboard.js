import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from "../style";

export default function GoToLeaderboard({placement, allPlayers})
{
    const profilePicture = require("../assets/icons/exampleProfilePicture.svg")
    const rightArrowPicture = require("../assets/icons/rightArrow.svg")

    //The component itself
    function onClickGoToLeaderBoard(){
        console.log("Should go to Leaderboard page now")

    }

    return(
        <View
            style={[style.goToLeaderboardBackground, style.displayRow, style.centerVeritically, style.centerHorzontally, {alignSelf: "center"}]} >

            <Image style={[style.widthHeight70,{ marginRight: 10, borderRadius: 15}]} source={profilePicture} />

            <View style={[style.displayColumn, {marginRight: 40}]}>
                <Text style={style.blackFontSize20}>Your Placement:</Text>
                <Text style={style.greyFontSize16}>{placement}/{allPlayers.length}</Text>
            </View>

            <TouchableOpacity style={[style.displayRow, style.centerVeritically]}onPress={onClickGoToLeaderBoard}>
                <Text style={[style.blackFontSize13, {marginRight: 10, width: 65}]}>See full leaderboard</Text>
                <Image source={rightArrowPicture} />
            </TouchableOpacity>

        </View>
    )

}