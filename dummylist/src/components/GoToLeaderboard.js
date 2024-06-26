import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import style from "../style";

export default function GoToLeaderboard({placement, navigation, propsToleaderboard})
{
    const profilePicture = require("../assets/icons/exampleProfilePicture.svg")
    const rightArrowPicture = require("../assets/icons/rightArrow.svg")

    //The component itself
    function onClickGoToLeaderBoard(){
        console.log("Should go to Leaderboard page now")
        navigation.navigate('LeaderboardPage', {challenge: propsToleaderboard})
    }

    return(
        <View
            style={[style.goToLeaderboardBackground, style.displayRow, style.centerVeritically, style.centerHorzontally, {alignSelf: "center", height: 124}]} >

            <Image style={[style.widthHeight70,{ marginRight: 10, borderRadius: 15}]} source={global.userInformation.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : {uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"}} />

            <View style={[style.displayColumn, {marginRight: 40}]}>
                <Text style={style.blackFontSize20}>Your Placement:</Text>
                <Text style={style.greyFontSize16}>{placement || propsToleaderboard.joinedMembers.length}/{propsToleaderboard.joinedMembers.length}</Text>
            </View>

            <Pressable style={[style.displayRow, style.centerVeritically]}onPress={onClickGoToLeaderBoard}>
                <Text style={[style.blackFontSize13, {marginRight: 10, width: 65}]}>See full leaderboard</Text>
                <Image source={rightArrowPicture} />
            </Pressable>

        </View>
    )

}