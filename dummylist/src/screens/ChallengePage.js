import React from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';

import Header from "../components/Header";
import GoToLeaderboard from "../components/GoToLeaderboard";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import TaskComponent from "../components/TaskComponent";

import { calculatePlacement } from "../components/GlobalFunctions";

export default function ChallengesPage({navigation})
{
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}
    console.log(challenge.id)

    function handleImageClick(task)
    {
        console.log("Challenge clicked -> Go to take photo/video!")
        navigation.navigate('CameraPage', { task: task, challengeID : challenge.id });
    }

    function getAllMembersWhoFinnishedTheTask(task) {
        const allFriendsIDWhoFinnished = [];
        task.friendsTask.map(friend => {
            if (friend.hasCompletedTask) {
                allFriendsIDWhoFinnished.push(friend.friendID);
            }
        });
        return allFriendsIDWhoFinnished;
    }

    function getAllPlayersFromChallenge() //Only use friends who has accepted the challenge
    {

        const participants = challenge.friends.map((friend) => {
            return friend.user
        })
        return participants
    }

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#FFDF9D"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge.challengeName}/>
                </View>

                <View style={{marginVertical: 21}}>
                    <GoToLeaderboard propsToleaderboard={challenge} navigation={navigation}placement={calculatePlacement(challenge)} allPlayers={getAllPlayersFromChallenge()}/>
                </View>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D0E4FF"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={true}/>
                </View>

                <ScrollView style={{marginTop: 21}}>
                    {challenge.tasks?.map(task => (
                        <View key={task.taskDescription}>
                            <TaskComponent 
                                description={task.taskDescription} 
                                membersCompletedTask={getAllMembersWhoFinnishedTheTask(task)} 
                                totalMembersInChallenge={task.friendsTask.length} 
                                isCompleted={getAllMembersWhoFinnishedTheTask(task).some(friendID => friendID === global.userInformation.id)} 
                                onPress={() => handleImageClick(task)}
                            />
                        </View>
                    ))}
                </ScrollView>                
            </View>
        </View>
    )
}