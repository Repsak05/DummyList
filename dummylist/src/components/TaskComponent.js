import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function TaskComponent({description, membersCompletedTask, totalMembersInChallenge, onPress, isCompleted = false}) 
{
    return (
        <View style={[style.taskContainer, {height: 94, alignSelf: "center", backgroundColor: !isCompleted ? "#001D34" : "#F2B705" }]}>
            <View style={style.taskTextContainer}>
                <Text style={style.taskMainText}>{description}</Text>
                <Text style={style.taskSmallText}>Done by {membersCompletedTask.length}/{totalMembersInChallenge} people</Text>
            </View>
            {!isCompleted ? (
                <Pressable onPress={onPress}>
                    <Image style={style.taskImg} source={require("../assets/icons/cameraIcon.svg")} />
                </Pressable>
            ) : (
                <Image style={style.taskImg} source={require("../assets/icons/checkmarkIcon.svg")} />
            )}
        </View>
    );
}
