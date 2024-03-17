import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import GoToLeaderboard from "../components/GoToLeaderboard";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import TaskComponent from "../components/TaskComponent";

export default function ChallengePage({navigation})
{
    //Following should be parameters (information in the database):
    const challengeGroupName = "De Ekstreme Bananer";
    const allTasksInChallenge = [
        ["Eat A Raw Egg"                ,["Per, John"]              , 5,    false], 
        ["Play Sport for 20 min"        ,["Me"]                     , 5,    true],
        ["Eat A Raw Onion"              ,[]                         , 5,    false], 
        ["Cut 10 cm of your Hair"       ,["Alex", "John", "Igor"]   , 5,    false], 
        ["Don't wear Socks for a Day"   ,["Søren", "Igor"]          , 5,    false]
    ];

    function handleImageClick(description)
    {
        console.log("Challenge clicked -> Go to take photo/video!")
        navigation.navigate('CameraPage', { title: description });
    }

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#FFDF9D"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challengeGroupName}/>
                </View>

                <View style={{marginVertical: 21}}>
                    <GoToLeaderboard navigation={navigation}placement={4} allPlayers={["Me", "Myself", "I", "Another", "Random Guy"]}/>
                </View>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D0E4FF"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={true}/>
                </View>

                <View style={{marginTop: 21}}>
                    {allTasksInChallenge.map(arr => (
                        <View key={arr[0]}>
                            <TaskComponent 
                                description={arr[0]} 
                                membersCompletedTask={arr[1]} 
                                totalMembersInChallenge={arr[2]} 
                                isCompleted={arr[3]} 
                                onPress={() => handleImageClick(arr[0])}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}