import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import style from "../style";
import { calculateTimeLeft, hasTeamCompletedTask } from "../components/GlobalFunctions";
import Header from "../components/Header";
import GoToTasks from "../components/GoToTasks";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";


export default function TeamModeLeaderboard({route, navigation})
{
    const { challenge } = route.params;

    const allTeams = getAllTeams();
    const teamAmountOfCompletedTasks = getHowManyTasksEachTeamHasCompleted();
    const leaderboard = getLeaderboard();
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

    function getAllTeams() // [[p1, p2], [p3,p4,p5], [p6]...]
    {
        let allTeams = [];
        for(let team of challenge.teams)
        {
            allTeams.push(team.members);
        }

        return allTeams;
    }

    function getHowManyTasksEachTeamHasCompleted() // {0: 7, 1 : 4, 2 : 9} //TeamIndex : amountOfTaskComplete
    {
        const teams = getAllTeams();
        let map = {};
        let index = 0;

        for(let team of teams)
        {

            for(let task of challenge.tasks)
            {
                if(hasTeamCompletedTask(task, team))
                {
                    if(map[index]){
                        map[index] += 1;
                    }else{
                        map[index] = 1;
                    }
                }
            }

            if(!map[index]){
                map[index] = 0;
            }

            index += 1;
        }

        return map;
    }

    function getLeaderboard() //Output e.g.: [2, 0, 1] //gets index of teamNum-1 in order of placement 
    {
        const obj = teamAmountOfCompletedTasks;
        const entries = Object.entries(obj);
        const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
        const sortedKeys = sortedEntries.map(entry => parseInt(entry[0]));

        return sortedKeys;
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