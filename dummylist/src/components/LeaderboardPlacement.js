import React, { useEffect, useState } from "react";
import { View, Image, Text } from 'react-native';
import style from "../style";
import { readSingleUserInformation } from "../../firebase";
import { getProfilePic } from "../components/GlobalFunctions";

export default function LeaderboardPlacement({username, placement, challengesCompleted, amountOfChallenges, userID })
{
    const backgroundColorPlacement = [
        "#3F96E0",
        "#00629F",
        "#003E67",
        "#002845",
        "#001223",
    ]

    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        async function getPic()
        {
            setProfilePic(await getProfilePic(userID));
        }
        getPic();
    }, [])
    return (
        <View style={[style.taskContainer, {height: 94, alignSelf: "center", backgroundColor: backgroundColorPlacement[placement-1]}]}>
            <Image style={[style.taskImg,{marginRight: 15, width: 50, height: 50, borderRadius: 15}]} source={profilePic} />
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>@{username}</Text>
                <Text style={style.taskSmallText}>Done {challengesCompleted}/{amountOfChallenges} Challenges</Text>
            </View>
            <Text style={style.whiteFontSize31}>{placement}</Text>
        </View>
    );
}