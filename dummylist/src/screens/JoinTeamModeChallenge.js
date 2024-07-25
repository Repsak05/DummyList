import React, {useEffect, useState} from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import ChooseTeamButton from "../components/ChooseTeamButton.js";
import { getRandomNumber, getTeams } from "../components/GlobalFunctions.js";
import { addUserToTeam } from "../../firebase.js";

export default function JoinTeamModeChallenge({navigation, route})
{
    //TODO: Missing to add id to chosen team
    //! Replace recursion in function challengeJoined()

    const preChal = route.params || {}; //Is apprently needed
    const chal = preChal.challenge || {}; //{isOwner: boolean, challenge : {x: y, z: n, ...}}
    let challenge = chal.challenge || {}; //Only challenge obj
    const [chosenTeam, setChosenTeam] = useState(false);
    const amountOfPeopleWhoCanJoinEachTeam = 1 + Math.floor(challenge.joinedMembers.length / challenge.teams.length);
    
    async function challengeJoined()
    {
        //Local creation of teams
        const teamNum = chosenTeam || getRandomNumber(1, challenge.teams.length);
        
        if(!determineIfCanChooseTeam(teamNum)){
            challengeJoined(); //! this can be maybe way more efficient;
            console.log("Handling wrong placement case");
            return;

        }else{
            challenge.teams = getTeams(teamNum, challenge.teams.length);
            
            //Add values to DB
            await addUserToTeam(challenge.id, teamNum, global.userInformation.id);
    
            navigation.navigate("AcceptChallengeOverviewPage", {
                chal : {
                    ...chal,
                    challenge : challenge,
                    isAccepted : true,
                }
            });
    
            console.log("Joining Team... Team chosen: " + teamNum);
        }
    }

    function determineIfCanChooseTeam(teamIndex){ 
        return (challenge.teams[teamIndex - 1].members.length < amountOfPeopleWhoCanJoinEachTeam);
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header navigation={navigation} pageName={"Join Challenge"}/>
            </View>

            <View>
                <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 17 }]}>Choose Team to Join</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", alignItems:"center"}}>
                    {challenge.teams.map((_, index) => (
                        <ChooseTeamButton
                            key={index}
                            index={index}
                            onPress={() => {
                                if(determineIfCanChooseTeam(index + 1))
                                {
                                    setChosenTeam(index + 1);
                                }
                            }}
                            valueToCheckIfEqualIndex={chosenTeam}
                            
                            textTopRight={`${chosenTeam === index + 1 ? challenge.teams[index].members.length + 1  : challenge.teams[index].members.length}/${amountOfPeopleWhoCanJoinEachTeam}`}
                        />
                    ))}

                    <ChooseTeamButton
                        isRandomButton={true}
                        valueToCheckIfEqualIndex={chosenTeam}
                        onPress={() => setChosenTeam(false)}
                    />
                </View>
            </View>

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 20}}>
                <NextPreviousButton text={"Join Challenge"} onPress={challengeJoined}/>
            </View>
        </View>
    )

}