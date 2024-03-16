import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import GoToTasks from "../components/GoToTasks";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";

export default function LeaderboardPage({navigation})
{
    //Following should be parameters (information in the database):
    const challengeGroupName = "De Ekstreme Bananer";
    const allChallenges = ["Eat A Raw Egg", "Play Sport for 20 min", "Eat A Raw Onion", "Cut 10 cm of your Hair", "Don't wear Socks for a Day"  ]  
    const leaderboardInformation = [
        ["Per", 1, ["Eat A Raw Egg", "Play Sport for 20 min", "Eat A Raw Onion", "Cut 10 cm of your Hair"]],
        ["Søren" , 2, ["Play Sport for 20 min", "Eat A Raw Onion", "Cut 10 cm of your Hair"]],
        ["John", 3, ["Play Sport for 20 min", "Eat A Raw Onion"]],
        ["Kasper", 4, ["Eat A Raw Egg"]],
        ["Igor", 5, ["Eat A Raw Onion"]],
    ]

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#9CF1EE"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challengeGroupName}/>
                </View>
            </View>

            <View style={{marginVertical: 21}}>
                <GoToTasks navigation={navigation} completeChallenges={["Egg", "Sport"]} allChallenges={["Me", "Myself", "I", "Another", "Random Guy"]}/>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D3EC9E"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={false}/>
                </View>

                <View style={{marginTop: 21}}>
                    {leaderboardInformation.map(arr => (
                        <View key={arr[0]}>
                            <LeaderboardPlacement username={arr[0]} placement={arr[1]} challengesCompleted={arr[2]} allChallenges={allChallenges}/>
                        </View>
                    ))}
                </View>
            </View>
            
        </View>
    )
}