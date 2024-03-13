import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from "../style";


export default function TaskComponent({description, membersCompletedTask, totalMembersInChallenge}) {
    function handleImageClick(){
        console.log("Challenge clicked!")
    }

    return (
        <View style={[style.taskContainer, { backgroundColor: "#001D34" }]}>
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>{description}</Text>
                <Text style={style.taskSmallText}>Done by {membersCompletedTask.length}/{totalMembersInChallenge} people</Text>
            </View>
            <TouchableOpacity onPress={handleImageClick}>
                <Image style={style.taskImg} source={require("../assets/icons/cameraIcon.svg")} />
            </TouchableOpacity>
        </View>
    );
}
