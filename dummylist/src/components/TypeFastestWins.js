import React from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import style from "../style";

import TaskComponent from "./TaskComponent";
import { getAllMembersWhoFinnishedTheTask } from "./GlobalFunctions";

export default function TypeFastestWins({navigation, theChallenge})
{
    console.log(theChallenge);


    function handleImageClick(task)
    {
        console.log("Challenge clicked -> Go to take photo/video!")
        console.log(task);
        console.log("ABONEBE IS TAKS");
        navigation.navigate('CameraPage', { task: task, challengeID : theChallenge.id });
    }

    return(
        <View style={{flex: 1}}>
            {theChallenge?.tasks?.map(task => (
                <View key={task.taskDescription}>
                    <TaskComponent 
                        description={task.taskDescription} 
                        membersCompletedTask={getAllMembersWhoFinnishedTheTask(task)} 
                        totalMembersInChallenge={theChallenge.joinedMembers.length} 
                        isCompleted={getAllMembersWhoFinnishedTheTask(task).some(friendID => friendID === global.userInformation.id)} 
                        onPress={() => handleImageClick(task)}
                    />
                </View>
            ))}
        </View>
    )
}