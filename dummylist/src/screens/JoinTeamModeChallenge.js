import React, {useEffect, useState} from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import ChooseTeamButton from "../components/ChooseTeamButton.js";

export default function JoinTeamModeChallenge({navigation, route})
{
    //TODO: Need to replace: textTopRight
    //TODO: Missing to add id to chosen team
    
    const challenge = route.params || {};

    function challengeJoined()
    {
        //!Add values to DB
        console.log("Joining Challenge");
    }

    const [chosenTeam, setChosenTeam] = useState(false);
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
                            textTopRight={`${chosenTeam === index + 1 ? "1" : "0"}/404`}
                        />
                    ))}

                    <ChooseTeamButton
                        isRandomButton={true}
                        index={index}
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