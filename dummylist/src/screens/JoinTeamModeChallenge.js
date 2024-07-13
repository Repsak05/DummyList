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
    //TODO: Need to replace: textTopRight
    //TODO: Missing to add id to chosen team
    //TODO: Needs to be conditions to check if teams can be joined
    //TOP right text is not int

    const preChal = route.params || {}; //Is apprently needed
    const chal = preChal.challenge || {}; //{isOwner: boolean, challenge : {x: y, z: n, ...}}
    let challenge = chal.challenge || {}; //Only challenge obj
    const [chosenTeam, setChosenTeam] = useState(false);
    
    async function challengeJoined()
    {
        //Local creation of teams
        const teamNum = chosenTeam ? chosenTeam : getRandomNumber(1, challenge.teams.length);
        challenge.teams = getTeams(teamNum, challenge.teams.length);
        
        //Add values to DB
        await addUserToTeam(challenge.id, teamNum, global.userInformation.id);

        console.log("Joining Challenge");
        navigation.navigate("AcceptChallengeOverviewPage", {
            chal : {
                ...chal,
                challenge : challenge,
                isAccepted : true,
            }
        });
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
                            onPress={() => setChosenTeam(index + 1)}
                            valueToCheckIfEqualIndex={chosenTeam}
                            
                            textTopRight={`${chosenTeam === index + 1 ? challenge.teams[index].members.length + 1  : challenge.teams[index].members.length}/${Math.max(challenge.invitedMembers.length / challenge.teams.length)}`}
                        />
                    ))}

                    <ChooseTeamButton
                        isRandomButton={true}
                        valueToCheckIfEqualIndex={chosenTeam}
                        onPress={() => setChosenTeam(false)}
                    />
                </View>
            </View>

            <View style={{marginTop: 17}}>
                <NextPreviousButton text={"Join Challenge"} onPress={challengeJoined}/>
            </View>
        </View>
    )

}