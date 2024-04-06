import React from "react";
import { View, Image, Text } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';

import Header from "../components/Header";
import GoToLeaderboard from "../components/GoToLeaderboard";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import TaskComponent from "../components/TaskComponent";


export default function ChallengePage({navigation})
{
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}

    function handleImageClick(description)
    {
        console.log("Challenge clicked -> Go to take photo/video!")
        navigation.navigate('CameraPage', { title: description });
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

    function calculatePlacement(id = global.userInformation.id)
    {
        const counts = {}

        challenge.tasks.map(task => {
            task.friendsTask.map(taskFriends => {
                if(taskFriends.hasCompletedTask){
                    counts[taskFriends.friendID] = counts[taskFriends.friendID] + 1 || 1;
                }
            })
        })

        const countPairs = Object.entries(counts);
        countPairs.sort((a, b) => b[1] - a[1]);

        
        for(let i = 0; i < countPairs.length; i++)
        {
            if(countPairs[i][0] == id){
                return i+1
            }
        }
    }

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#FFDF9D"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge.challengeName}/>
                </View>

                <View style={{marginVertical: 21}}>
                    <GoToLeaderboard navigation={navigation}placement={calculatePlacement()} allPlayers={getAllPlayersFromChallenge()}/>
                </View>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D0E4FF"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={true}/>
                </View>

                <View style={{marginTop: 21}}>
                    {challenge.tasks?.map(task => (
                        <View key={task.taskDescription}>
                            <TaskComponent 
                                description={task.taskDescription} 
                                membersCompletedTask={getAllMembersWhoFinnishedTheTask(task)} 
                                totalMembersInChallenge={task.friendsTask.length} 
                                isCompleted={getAllMembersWhoFinnishedTheTask(task).some(friendID => friendID === global.userInformation.id)} 
                                onPress={() => handleImageClick(task.taskDescription)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}