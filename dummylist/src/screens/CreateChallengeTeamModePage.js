import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import NumberWheel from "../components/NumberWheel.js";

export default function CreateChallengeTeamModePage({navigation, route})
{
    //TODO: Fix progressbar xp level
    //! Set/get DB values 

    const { challenge } = route.params || {};
    const [challengeValues, setChallengeValues] = useState({
        ...challenge,
        teams : []
    });

    const [numberOfTeams, setNumberOfTeams] = useState(2);


    
    const amountOfTeams = 2; //Temp
    const totalInvitedMembers = 20;
    const team = [[3], [7], [3], [7]];
    
    const teamColors = [
        ["#D3EC9E", "#141F00"],
        ["#D0E4FF", "#001D34"],
        ["#A6290D", "#111"],
        ["#F2E2C4", "#111"],
    ];

    function previousFunction(){
        console.log("Previous pressed");
    }

    function nextFunction()
    {
        console.log("Navigate to next page");

        navigation.navigate("CreateChallengePageThree", {
            allCurrentChallengeValues : challengeValues
        });
    }

    function chooseTeam(team)
    {
        console.log("Team Chosen: " + team);
    }

    function chooseRandomTeam()
    {
        console.log("Choosing Random Team");
    }

    useEffect(() => {
        //Update DB values: Teams
        setChallengeValues((prev) => ({
            ...prev,
            teams: numberOfTeams
        }));
    }, [numberOfTeams])

    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={{ marginTop: 55, marginBottom: 17 }}>
                <Header navigation={navigation} pageName={"Create Challenge"} />
            </View>

            <View style={{ alignSelf: "center", marginBottom: 127 }}>
                <ProgressBarTemplate currentXp={3} maxXp={4} text={"3/4"} setWidth={400} />
            </View>


            <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 17 }]}>Choose Amount Of Teams</Text>
            <NumberWheel
                totalNumberOfValues={2}
                deviderValue={2}
                minNumber={2}
                onValueChange={(value) => setNumberOfTeams(value)}
            />

            <Text style={[style.blackFontSize20, { paddingLeft: 17, fontSize: 20, marginBottom: 17 }]}>Choose Teams for the Challenge</Text>
            <View style={{paddingHorizontal: 0}}>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", alignItems:"center"}}>
                    {team.map((value, index) => (
                        <Pressable onPress={ () => chooseTeam(index+1)} key={index} style={[style.roundedCornersSmall, { backgroundColor: teamColors[index % teamColors.length][0], padding: 10, margin: 5, width: 100, height: 100 }]}>
                            <Text style={[style.blackFontSize40, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>{index + 1}.</Text>
                            <Text style={[style.blackFontSize16, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>Team</Text>
                            <Text style={[style.blackFontSize13, { position: "absolute", top: 3, right: 3 }]}>{value}/{totalInvitedMembers}</Text>
                        </Pressable>
                    ))}

                    <Pressable onPress={chooseRandomTeam} style={[style.roundedCornersSmall, {backgroundColor: "#FFDF9D", padding: 10, margin: 5, width: 100, height: 100}]}>
                        <Image source={require("../assets/icons/randomIcon.svg")} style={{width: 45, heigth: 44, alignSelf: "center", marginTop: 10}}/>
                        <Text style={[style.blackFontSize16, { textAlign: "center",  color: "#251A00", marginTop: 10 }]}>Random</Text>
                    </Pressable>
                </View>
            </View>

            

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextFunction}/>
            </View>
            
        </View>
    )

}