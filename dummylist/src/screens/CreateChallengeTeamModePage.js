import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import NumberWheel from "../components/NumberWheel.js";
import { getRandomNumber } from "../components/GlobalFunctions.js";

export default function CreateChallengeTeamModePage({navigation, route})
{
    const { challenge } = route.params || {};
    const [challengeValues, setChallengeValues] = useState({
        ...challenge,
        teams : []
    });

    const [numberOfTeams, setNumberOfTeams] = useState(2);
    const totalInvitedMembers = challenge.invitedMembers.length;
    const maxNumberOfTeams = Math.max(totalInvitedMembers / 2) || 1;
    const [chosenTeam, setChosenTeam] = useState(false);
    
    const teamColors = [
        ["#D3EC9E", "#141F00"],
        ["#D0E4FF", "#001D34"],
        ["#A6290D", "#111"],
        ["#F2E2C4", "#111"],
    ];

    function previousFunction(){
        console.log("Previous pressed");
        navigation.navigate("CreateChallengePageTwo", {allChallengeValues : challengeValues});
    }

    function getTeams(theChosenTeamNum = chosenTeam)
    {
        let teams = [];

        for(let i = 1; i <= maxNumberOfTeams; i++)
        {
            if(theChosenTeamNum == i){
                teams.push([global.userInformation.id]);
            }else{
                teams.push([]);
            }
        }

        console.log(teams);
        return teams;
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
                teams : getTeams(teamNum)}
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
                                        <Pressable onPress={ () => chooseTeam(index+1)} key={index} style={[style.roundedCornersSmall, chosenTeam == index+1 ? style.isPicked : style.isNotPicked, { backgroundColor: teamColors[index % teamColors.length][0], padding: 10, margin: 5, width: 100, height: 100, }]}>
                                            <Text style={[style.blackFontSize40, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>{index + 1}.</Text>
                                            <Text style={[style.blackFontSize16, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>Team</Text>
                                            <Text style={[style.blackFontSize13, { position: "absolute", top: 3, right: 3 }]}>{chosenTeam == index + 1 ? 1 : 0}/{totalInvitedMembers}</Text>
                                        </Pressable>
                                    ))}

                                    <Pressable onPress={chooseRandomTeam} style={[style.roundedCornersSmall, chosenTeam == false ? style.isPicked : style.isNotPicked, {backgroundColor: "#FFDF9D", padding: 10, margin: 5, width: 100, height: 100}]}>
                                        <Image source={require("../assets/icons/randomIcon.svg")} style={{width: 45, heigth: 44, alignSelf: "center", marginTop: 10}}/>
                                        <Text style={[style.blackFontSize16, { textAlign: "center",  color: "#251A00", marginTop: 10 }]}>Random</Text>
                                    </Pressable>
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