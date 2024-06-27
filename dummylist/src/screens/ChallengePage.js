import React, { useEffect } from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';

import Header from "../components/Header";
import GoToLeaderboard from "../components/GoToLeaderboard";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";

import { calculatePlacement } from "../components/GlobalFunctions";
import TypeFastestWins from "../components/TypeFastestWins";
import TypeBingo from "../components/TypeBingo";

export default function ChallengesPage({navigation})
{
    const route = useRoute();
    const {challenge} = route.params; //Object: {isOwner: boolean, challenge : {x: y, z: n, ...}}
    console.log(challenge.id)

    // useEffect(() => {
    //     if(challenge.gameMode == "Bingo")
    //     {
    //         console.log("Now calculating bingo placement");
    //         console.log(calculateBingoPlacement(challenge));
    //     }
    // }, [])

    // function calculateBingoPlacement(challenge, returnPlacementInsertID) //GameMode fastest wins
    // {
    //     //Create grid with true false depending on whether task is completed
    //     let rowMember = {}
    //     let gridMember = {}

    //     for(let participant of challenge.joinedMembers)
    //     {
    //         rowMember[participant] = []
    //         gridMember[participant] = []
    //     }

    //     let columnNumber = 0;   

    //     for(let task of challenge.tasks)
    //     {
    //         columnNumber++;
    //         const allPlayers = task.friendsTask;

    //         for(let friends of allPlayers)
    //         {
    //             if(friends.hasCompletedTask)
    //             {
    //                 const participantWhoHasCompletedTask = friends.friendID;
    //                 rowMember[participantWhoHasCompletedTask].push(true);
    //             }
    //         }

    //         if(columnNumber >= 4)
    //         {
    //             for(let participant of challenge.joinedMembers)
    //             {
    //                 gridMember[participant].push([...rowMember[participant]]);
    //                 rowMember[participant] = [];
    //             }
    //             columnNumber = 0;
    //         }
    //     }

    //     //map with player and amount of rows complete:
    //     let playersAmountOfRowsComplete = {}
    //     for(let players in gridMember)
    //     {
    //         const player = gridMember[players];
    //         let rowsComplete = 0;

    //         for(let row of player)
    //         {
    //             if(row.length == 4)
    //             {
    //                 rowsComplete++;
    //             }
    //         }
    //         playersAmountOfRowsComplete[players] = rowsComplete;
    //     }

    //     //Create an array which displays the placement of each member (sorted by amount of rows completed);
    //     const entries = Object.entries(playersAmountOfRowsComplete);
    //     entries.sort((a, b) => b[1] - a[1]);
    //     const sortedIDs = entries.map(entry => entry[0]);
        
        
    //     //Conosle.log all useable information
    //     console.log("grid ->");
    //     console.log(gridMember);
        
        
    //     console.log("playersAmountOfRowsComplete");
    //     console.log(playersAmountOfRowsComplete)
        
    //     console.log("sortedIDs");
    //     console.log(sortedIDs);

    //     if(returnPlacementInsertID)
    //     {
    //         for(let i = 0; i< sortedIDs.length; i++)
    //         {
    //             if(sortedIDs[i] == returnPlacementInsertID)
    //             {
    //                 return i+1;
    //             }
    //         }
    //     }else {
    //         return sortedIDs;
    //     }
    // }

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#FFDF9D"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge.challengeName}/>
                </View>

                <View style={{marginVertical: 21}}>
                    <GoToLeaderboard propsToleaderboard={challenge} navigation={navigation}placement={calculatePlacement(challenge)}/>
                </View>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D0E4FF"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={"Tasks"}/>
                </View>

                <ScrollView style={{marginTop: 21}}>
                    {challenge?.gameMode == "Fastest Wins" || challenge?.gameMode == "Long List" && (
                        <TypeFastestWins navigation={navigation} theChallenge={challenge}/>
                    )} 
                    {challenge?.gameMode == "Bingo" && (
                        <TypeBingo challenge={challenge} navigation={navigation}/>
                    )}
                </ScrollView>                
            </View>
        </View>
    )
}