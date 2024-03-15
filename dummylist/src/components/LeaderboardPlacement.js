import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function LeaderboardPlacement({useranme, placement, challengesCompleted, allChallenges })
{
    const backgroundColorPlacement = [
        "#3F96E0",
        "#00629F",
        "#003E67",
        "#002845",
        "#001223",
    ]
    return (
        <View style={[style.taskContainer, {alignSelf: "center", backgroundColor: backgroundColorPlacement[placement-1]}]}>
            <Image style={[style.taskImg,{marginRight: 15, width: 50, height: 50}]} source={require("../assets/icons/exampleProfilePicture.svg")} />
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>@{useranme}</Text>
                <Text style={style.taskSmallText}>Done {challengesCompleted.length}/{allChallenges.length} Challenges</Text>
            </View>
            <Text style={style.whiteFontSize31}>{placement}</Text>
        </View>
    );
}