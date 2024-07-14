import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import style from "../style";
import { calculateTimeLeft, hasTeamCompletedTask, getHowManyTasksEachTeamHasCompleted, getAllTeams, getLeaderboard } from "../components/GlobalFunctions";
import Header from "../components/Header";
import GoToTasks from "../components/GoToTasks";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";


export default function TeamModeLeaderboard({route, navigation})
{
    const { challenge } = route.params;

    const allTeams = getAllTeams(challenge);
    const teamAmountOfCompletedTasks = getHowManyTasksEachTeamHasCompleted(challenge);
    const leaderboard = getLeaderboard(teamAmountOfCompletedTasks);
    const indexOfYourTeam = getYourTeamIndex();

    function getYourTeamIndex()
    {
        const i = 0;

        for(let team of allTeams)
        {
            for(let member of team)
            {
                if(member == global.userInformation.id){
                    return i;
                }
            }

            i++;
        }
    }

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#9CF1EE"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge?.challengeName}/>
                </View>
            </View>

            <View style={{marginVertical: 21}}>
                <GoToTasks navigation={navigation} propsToTask={challenge} completeChallenges={teamAmountOfCompletedTasks[indexOfYourTeam]} allChallenges={challenge.tasks.length}/>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D3EC9E"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation otherText={calculateTimeLeft(challenge)} isChallengeOrLeaderboard={"Leaderboard"}/>
                </View>

                <ScrollView style={{ marginTop: 21 }}>
                    {leaderboard.slice(0, 5).map((teamIndex, placementIndex) => (
                       <LeaderboardPlacement
                            key={placementIndex}
                            username={indexOfYourTeam == teamIndex ? `Team ${teamIndex+1} (You)` : `Team ${teamIndex+1}`}
                            withoutAt={true}
                            placement={placementIndex + 1}
                            specialColor={teamAmountOfCompletedTasks[teamIndex] == 0 ? "#555" : false}
                            challengesCompleted={teamAmountOfCompletedTasks[teamIndex]}
                            amountOfChallenges={challenge.tasks.length}
                            extraStyle={indexOfYourTeam == teamIndex ? {borderWidth: 5, borderColor : "#111"} : false}
                       />
                    ))}
                </ScrollView>
            </View>
            
        </View>
    )
}