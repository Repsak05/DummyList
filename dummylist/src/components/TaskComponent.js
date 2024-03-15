import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function TaskComponent({description, membersCompletedTask, totalMembersInChallenge, isCompleted = false}) {
    
    function handleImageClick() {
        console.log("Challenge clicked -> Go to take photo/video!")
    }

    return (
        <View style={[style.taskContainer, {alignSelf: "center", backgroundColor: !isCompleted ? "#001D34" : "#F2B705" }]}>
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>{description}</Text>
                <Text style={style.taskSmallText}>Done by {membersCompletedTask.length}/{totalMembersInChallenge} people</Text>
            </View>
            {!isCompleted ? (
                <TouchableOpacity onPress={handleImageClick}>
                    <Image style={style.taskImg} source={require("../assets/icons/cameraIcon.svg")} />
                </TouchableOpacity>
            ) : (
                <Image style={style.taskImg} source={require("../assets/icons/checkmarkIcon.svg")} />
            )}
        </View>
    );
}
