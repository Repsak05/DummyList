import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable, ScrollView } from 'react-native';
import style from "../style";
import { useRoute } from '@react-navigation/native';


import Header from "../components/Header";
import ChallengeLeaderboardTitleInformation from "../components/ChallengeLeaderboardTitleInformation";
import LeaderboardPlacement from "../components/LeaderboardPlacement";

import { calculatePlacement } from "../components/GlobalFunctions";
import { getUsernamesByIds, readSingleUserInformation } from "../../firebase"

export default function LeaderboardWhenChallengeIsFinished({navigation})
{
    //TODO Missing to set deafult image if value is empty in DB
    //! Leaderboard should be dependent on gameMode (e.g. Bingo vs. Fastest Wins)

    const route = useRoute();
    const {challenge} = route.params; 

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
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#f8f9ff"}}>
            <View>
                <View style={{marginTop: 55,}}>
                    <Header navigation={navigation} pageName={challenge?.challengeName}/>
                </View>
            </View>

            <View style={{marginVertical: 21}}>
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
                        />
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
                                amountOfChallenges={challenge?.tasks.length}
                                profileImage={participant.profileImage}
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