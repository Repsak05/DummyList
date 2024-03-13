import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from "../style";

import { useFonts, Oswald_400Regular, Oswald_500Medium } from '@expo-google-fonts/oswald';

export default function TaskComponent({description, membersCompletedTask, totalMembersInChallenge}) {
    let [fontsLoaded] = useFonts({
        Oswald_400Regular,
        Oswald_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }



    return (
        <View style={[style.taskContainer, { backgroundColor: "#F2B705" }]}>
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>{description}</Text>
                <Text style={style.taskSmallText}>Done by {membersCompletedTask.length}/{totalMembersInChallenge} people</Text>
            </View>
            <Image style={style.taskImg} source={require("../assets/icons/checkmarkIcon.svg")} />
        </View>
    );
}
