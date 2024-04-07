import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';

import Header from "../components/Header";
import GoToTasks from "../components/GoToTasks";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";

import { calculatePlacement } from "../components/GlobalFunctions";
import { readData } from "../../firebase"


export default function LeaderboardPage({navigation})
{ //TODO: //Replace Loading... with correct loading screen
    const route = useRoute();
    const {challenge} = route.params; 

    const [usernamesInChallenges, setUsernamesInChallenges] = useState() //{id1 : name1,    id2 : name2...}

    useEffect(() => {
        async function getUsernames() {
            try {
                const namesAndID = {};
                const res = await readData("Users");
                challenge.friends.forEach(participant => {
                    res.forEach(user => {
                        if (participant.user === user.id) {
                            namesAndID[participant.user] = user.Username;
                        }
                    });
                });
                setUsernamesInChallenges(namesAndID);

            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        }
    
        getUsernames();
    }, []);


    function getAllUserPlacements() 
    {
        let placements = [];

        challenge.friends.map(participant => {
            const rank = calculatePlacement(challenge, participant.user);
            placements.push({ id: participant.user, placement: rank });
            
        });

        placements.sort((a, b) => a.placement - b.placement);
        return placements;
    }

    return(
        
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#9CF1EE"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge?.challengeName}/>
                </View>
            </View>

            <View style={{marginVertical: 21}}>
                <GoToTasks navigation={navigation} propsToTask={challenge} completeChallenges={calculatePlacement(challenge, global.userInformation.id, true)} allChallenges={challenge.tasks.length}/>
            </View>


            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D3EC9E"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation daysLeftTillChallengeEnds={3} isChallengeOrLeaderboard={false}/>
                </View>

                <ScrollView style={{ marginTop: 21 }}>
                    {usernamesInChallenges ? (getAllUserPlacements().slice(0, 5).map(participant => (
                        <View key={participant.id}>
                            <LeaderboardPlacement
                                username={usernamesInChallenges[participant.id]}
                                placement={participant.placement}
                                challengesCompleted={calculatePlacement(challenge, participant.id, true)}
                                amountOfChallenges={challenge?.tasks.length}
                            />
                        </View>
                    ))) : (
                        <Text style={{textAlign: "center"}}>Loading...</Text>
                    )}
                </ScrollView>
            </View>
            
        </View>
    )
}