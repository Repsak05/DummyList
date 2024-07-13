import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import NumberWheel from "../components/NumberWheel.js";
import { getRandomNumber, getTeams } from "../components/GlobalFunctions.js";
import ChooseTeamButton from "../components/ChooseTeamButton.js";

export default function CreateChallengeTeamModePage({navigation, route})
{
    //TODO: Structure of Teams need to be remade: Can't be nested arrays :(

    const { challenge } = route.params || {};
    const [challengeValues, setChallengeValues] = useState({
        ...challenge,
        teams : []
    });

    const [numberOfTeams, setNumberOfTeams] = useState(2);
    const totalInvitedMembers = challenge.invitedMembers.length;
    const maxNumberOfTeams = Math.max(totalInvitedMembers / 2) || 1;
    const [chosenTeam, setChosenTeam] = useState(false);
    
    function previousFunction(){
        console.log("Previous pressed");
        navigation.navigate("CreateChallengePageTwo", {allChallengeValues : challengeValues});
    }

    function nextFunction()
    {
        //Select chosen team
        let teamNum = chosenTeam;

        if(!chosenTeam || chosenTeam > maxNumberOfTeams)
        {
            teamNum = getRandomNumber(1, maxNumberOfTeams)
        }

        //Navigate with new created teams
        navigation.navigate("CreateChallengePageThree", {
            allCurrentChallengeValues : {
                ...challengeValues,
                teams : getTeams(teamNum, maxNumberOfTeams)}
        });
    }

    function chooseTeam(team)
    {
        setChosenTeam(team);
        console.log("Team Chosen: " + team);
    }

    function chooseRandomTeam()
    {
        setChosenTeam(false);
        console.log("Choosing Random Team");
    }

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View>

                <View style={{ marginTop: 55, marginBottom: 17 }}>
                    <Header navigation={navigation} pageName={"Create Challenge"} />
                </View>

                <View style={{ alignSelf: "center", marginBottom: 127 }}>
                    <ProgressBarTemplate currentXp={3} maxXp={4} text={"3/4"} setWidth={400} />
                </View>

                { maxNumberOfTeams >= 2 ? (
                    <>
                        <View style={{marginBottom: 50}}>
                            <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 17 }]}>Choose Amount Of Teams</Text>
                            <NumberWheel
                                totalNumberOfValues={maxNumberOfTeams - 1}
                                deviderValue={2}
                                minNumber={2}
                                onValueChange={(value) => setNumberOfTeams(value)}
                            />
                        </View>

                        <View>
                            <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 17 }]}>Select Your Team!</Text>
                            <View style={{paddingHorizontal: 0}}>
                                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", alignItems:"center"}}>
                                    {Array.from({ length: numberOfTeams }).map((_, index) => (
                                        <ChooseTeamButton
                                            key={index}
                                            onPress={() => chooseTeam(index+1)}
                                            index={index}
                                            textTopRight={`${chosenTeam === index + 1 ? "1" : "0"}/${totalInvitedMembers}`}
                                            valueToCheckIfEqualIndex={chosenTeam}
                                        />
                                    ))}

                                    <ChooseTeamButton
                                        isRandomButton={true}
                                        onPress={chooseRandomTeam}
                                        valueToCheckIfEqualIndex={chosenTeam}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 40 }]}>Need to invite at least 3 friends before being able to acces Team Mode and creating teams</Text>
                )}


                <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                    <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                    <NextPreviousButton text={"Next"} onPress={nextFunction}/>
                </View>
            </View>
            
        </View>
    )

}