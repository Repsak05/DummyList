import React from "react";
import { View, Image, Text } from 'react-native';
import style from "../style";

export default function LeaderboardPlacement({username, placement, challengesCompleted, amountOfChallenges })
{
    const backgroundColorPlacement = [
        "#3F96E0",
        "#00629F",
        "#003E67",
        "#002845",
        "#001223",
    ]
    return (
        <View style={[style.taskContainer, {height: 94, alignSelf: "center", backgroundColor: backgroundColorPlacement[placement-1]}]}>
            <Image style={[style.taskImg,{marginRight: 15, width: 50, height: 50}]} source={require("../assets/icons/exampleProfilePicture.svg")} />
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>@{username}</Text>
                <Text style={style.taskSmallText}>Done {challengesCompleted}/{amountOfChallenges} Challenges</Text>
            </View>
            <Text style={style.whiteFontSize31}>{placement}</Text>
        </View>
    );
}