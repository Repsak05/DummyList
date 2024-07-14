import React from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import style from "../style";

import TaskComponent from "./TaskComponent";
import { hasTeamCompletedTask } from "./GlobalFunctions";

export default function TypeTeamMode({navigation, challenge})
{
    //!Navigation: Navigate to different page than leaderboard - or "personalize" it?

    const teams = challenge.teams;
    const yourTeam = findYourTeam();

    function findYourTeam()
    {
        //Find members of your team:
        let yourTeam = [global.userInformation.id];

        for(let teamGroup of teams) //Loop through teams
        {
            let teamMembers = teamGroup.members;

            for(let member of teamMembers) //Loop through members
            {
                if(member == global.userInformation.id){
                    yourTeam = teamMembers;
                    return yourTeam;
                }
            }    
        }
        return yourTeam; //Should never happen here
    }


    function howManyTeamsHasCompletedChallenge(task)
    {
        let amountOfTeamsCompleted = 0;
        for(let teamMember of teams)
        {
            if(hasTeamCompletedTask(task, teamMember.members)){
                amountOfTeamsCompleted++;
            }
        }

        return `Done by ${amountOfTeamsCompleted}/${teams.length} teams`
    }

    function handleImageClick(task)
    {
        console.log("Challenge clicked -> Go to take photo/video!")
        navigation.navigate('CameraPage', { task: task, challengeID : challenge.id });
    }
    
    return(
        <View style={{flex: 1}}>
            {challenge?.tasks?.map(task => (
                <View key={task.taskDescription}>
                    <TaskComponent 
                        description={task.taskDescription} 
                        alternativeText={howManyTeamsHasCompletedChallenge(task)}
                        isCompleted={hasTeamCompletedTask(task, yourTeam)} 
                        onPress={() => handleImageClick(task)}
                    />
                </View>
            ))}
        </View>
    )
}