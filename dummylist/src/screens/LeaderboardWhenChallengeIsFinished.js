import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';


import Header from "../components/Header";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";

import { calculatePlacement, getAllTeams } from "../components/GlobalFunctions";
import { getUsernamesByIds, readSingleUserInformation } from "../../firebase"
import GoToLeaderboard from "../components/GoToLeaderboard";

export default function LeaderboardWhenChallengeIsFinished({navigation})
{
    //TODO Missing to set deafult image if value is empty in DB
    //! Leaderboard should be dependent on gameMode (e.g. Bingo vs. Fastest Wins)

    const route = useRoute();
    const {challenge} = route.params; 

    const teams = getAllTeams(challenge);

    function getTeamNumberFromPlayerID(ID)
    {
        if(challenge.gameMode == "Team-Mode")
        {
            let index = 1;
            for(let team of teams)
            {
                for(let member of team)
                {
                    if(ID == member){
                        return `Team ${index}`
                    }
                }

                index++;
            }
        }
    }

    function getSpecialColor(id)
    {
        if(id == global.userInformation.id && challenge.gameMode == "Team-Mode"){ //Your color
            return "#F9BD14";
        }else if (calculatePlacement(challenge, id, true) == 0){ //Amount of challenges completed == 0
            return false;
            return "#555";
        }else{ //Get placement color
            return false
        }
    }

    

    const [usernamesInChallenges, setUsernamesInChallenges] = useState([]);
    const [yourInformation, setYourInformation] = useState();

    useEffect(() => {
        console.log(challenge);

        async function getAllUserPlacements() 
        {
            let placements = [];

            for (let participant of challenge.joinedMembers) 
            {
                const rank = calculatePlacement(challenge, participant);

                try
                {
                    const res = await readSingleUserInformation("Users", participant);
                    const username = res.Username;
                    const profileImage = res.ProfilePicture;

                    placements.push({ id: participant, placement: rank, username : username, profileImage : profileImage});

                    if(participant == global.userInformation.id){
                        setYourInformation({ id: participant, placement: rank, username : username, profileImage : profileImage});
                    }
                }catch(err){
                    console.log(err);
                }
            };

            placements.sort((a, b) => a.placement - b.placement);
            return placements;
        }

        getAllUserPlacements().then(placements => {
            setUsernamesInChallenges(placements);
        });

    }, [challenge])

    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: challenge.gameMode == "Team-Mode" ? "#FFDF9D" : "#f8f9ff"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge?.challengeName}/>
                </View>
            </View>

            <View style={{marginVertical: 21}}>
                {challenge.gameMode == "Team-Mode" ? (
                    <GoToLeaderboard 
                        navigation={navigation} 
                        isTeamMode={true} 
                        propsToleaderboard={challenge} 
                        placement={calculatePlacement(challenge)} 
                        tasksShouldNavigateBackTo={"LeaderboardWhenChallengeIsFinished"}
                        tasksPageIsFinished={true}
                        differentPlacementText={"Team Placement:"}
                    />
                    
                ) : (
                    <>
                        {yourInformation && (
                            <>
                                <Text style={[style.blackFontSize25, {marginLeft: 40, marginBottom: 10}]}>Your Placement: </Text>
                                <LeaderboardPlacement
                                    username={yourInformation.username}
                                    placement={yourInformation.placement}
                                    challengesCompleted={calculatePlacement(challenge, yourInformation.id, true)}
                                    amountOfChallenges={challenge?.tasks.length}
                                    profileImage={yourInformation.profileImage}
                                    specialColor={"#F9BD14"}
                                    teamText={challenge.gameMode == "Team-Mode" ? getTeamNumberFromPlayerID(global.userInformation.id) : false}
                                />
                            </>
                        )}
                    </>
                )}
            </View>

            <View style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "#D3EC9E"}}>
                <View style={{paddingTop: 45}}>
                    <ChallengeLeaderboardTitleInformation otherText={"Finished Result"} isChallengeOrLeaderboard={false}/>
                </View>

                <ScrollView style={{ marginTop: 21 }}>
                    {usernamesInChallenges ? (usernamesInChallenges.map(participant => (
                        <View key={participant.id}>
                            <LeaderboardPlacement
                                username={participant.username}
                                placement={participant.placement}
                                challengesCompleted={calculatePlacement(challenge, participant.id, true)}
                                specialColor={getSpecialColor(participant.id)}
                                amountOfChallenges={challenge?.tasks.length}
                                profileImage={participant.profileImage}
                                teamText={challenge.gameMode == "Team-Mode" ? getTeamNumberFromPlayerID(participant.id) : false}
                                extraStyle={participant.id == global.userInformation.id ? {borderWidth: 5, borderColor : "#111"} : false}

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