import React, { useEffect } from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';

import Header from "../components/Header";
import GoToLeaderboard from "../components/GoToLeaderboard";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";

import { calculatePlacement, calculateTimeLeft } from "../components/GlobalFunctions";
import TypeFastestWins from "../components/TypeFastestWins";
import TypeBingo from "../components/TypeBingo";
import TypeTeamMode from "../components/TypeTeamMode";

export default function ChallengesPage({navigation})
{
    //TODO: calculate placement should be regulared depending of gameMode
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}
    console.log(challenge.id)

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#FFDF9D"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge.challengeName}/>
                </View>

                <View style={{marginVertical: 21}}>
                    {challenge?.gameMode == "Team-Mode" ? (
                        <GoToLeaderboard navigation={navigation} isTeamMode={true} propsToleaderboard={challenge} placement={calculatePlacement(challenge)}/>
                    ): (
                        <GoToLeaderboard propsToleaderboard={challenge} navigation={navigation} placement={calculatePlacement(challenge)}/>
                    )}
                </View>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D0E4FF"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation otherText={calculateTimeLeft(challenge)} isChallengeOrLeaderboard={"Tasks"}/>
                </View>

                <ScrollView style={{marginTop: 21}}>
                    {(challenge?.gameMode == "Fastest Wins" || challenge?.gameMode == "Long List") && (
                        <TypeFastestWins theChallenge={challenge} navigation={navigation}/>
                    )} 
                    {challenge?.gameMode == "Bingo" && (
                        <TypeBingo challenge={challenge} navigation={navigation}/>
                    )}
                    {challenge?.gameMode == "Team-Mode" && (
                        <TypeTeamMode challenge={challenge} navigation={navigation}/>
                    )}
                </ScrollView>                
            </View>
        </View>
    )
}