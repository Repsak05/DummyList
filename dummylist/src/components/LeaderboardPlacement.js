import React, { useEffect, useState } from "react";
import { View, Image, Text } from 'react-native';
import style from "../style";
import { readSingleUserInformation } from "../../firebase";
import { getProfilePic } from "../components/GlobalFunctions";

export default function LeaderboardPlacement({username, placement, challengesCompleted, amountOfChallenges, userID, profileImage = false, specialColor = false, withoutAt = false, extraStyle = false, teamText = false})
{
    const backgroundColorPlacement = [
        "#3F96E0",
        "#00629F",
        "#003E67",
        "#002845",
        "#001223",
        "#555",
    ]

    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        if(!profileImage)
        {
            async function getPic()
            {
                if(userID)
                {
                    setProfilePic(await getProfilePic(userID));
                }
            }
            getPic();
        } else {
            setProfilePic(profileImage);
        }
    }, [])
    return (
        <View style={[style.taskContainer, extraStyle, {height: 94, alignSelf: "center", backgroundColor: specialColor ? specialColor : backgroundColorPlacement[placement - 1] || backgroundColorPlacement[backgroundColorPlacement.length - 1]}]}>
            <Image style={[style.taskImg,{marginRight: 15, width: 50, height: 50, borderRadius: 15}]} source={profilePic} />
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>{withoutAt ? username : "@" + username}</Text>
                <Text style={style.taskSmallText}>Done {challengesCompleted}/{amountOfChallenges} Challenges</Text>
            </View>
            {teamText && (
                <Text style={[style.whiteFontSize16, {marginRight: 20}]}>{teamText}</Text>
            )}
            <Text style={style.whiteFontSize31}>{placement}</Text>
        </View>
    );
}