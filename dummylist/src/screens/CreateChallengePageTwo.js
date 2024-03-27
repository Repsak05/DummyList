import React, {useState} from "react";
import { View, ScrollView, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/progressBarTemplate.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";

import SliderComponent from "../components/SliderComponent.js";

export default function CreateChallengePageTwo({navigation, route})
{

    const { allChallengeValues } = route.params;
    const [allCurrentChallengeValues, setAllCurrentChallengeValues] = useState(allChallengeValues)

    function updateStartingTime(val)
    {
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            startingTime: val
        })
    }
    
    function addFriendsToChallenge(friend) 
    {
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            friends: [...allCurrentChallengeValues.friends, friend]
        });
    }

    function removeNameFromChallenge(name) 
    {
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            friends: allCurrentChallengeValues.friends.filter(friend => friend !== name)
        });
    }

    function nextFunction()
    {
        console.log("Go to next!");
        navigation.navigate("CreateChallengePageThree", {
            allCurrentChallengeValues
        });
    }

    function previousFunction()
    {
        console.log("Previous Clicked")
        navigation.navigate("CreateChallengePageOne", {
            allCurrentChallengeValues
        });
    }

    function displayFriendsInChallengeCorrectly(arr) 
    {
        const isFriendAdded = allCurrentChallengeValues.friends.includes(arr[0]);

        return (
            <AddFriends name={arr[0]} showLevel={true} level={arr[1]} image={arr[2]} 
                showCancelFriend={isFriendAdded}
                showAddFriend={!isFriendAdded}
                onPressCancel={() => removeNameFromChallenge(arr[0])}
                onPressAddFriend={() => addFriendsToChallenge(arr[0])}
            />
        );
    }


    //Should be changed to be a parameter (together with image)
    const allAddedFriends = [ 
        ["Peter",   29, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Svend",   21, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Erik",    19, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Knud",    39, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Pete1r",  29, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Sven2d",  21, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Eri3k",   19, require("../assets/icons/exampleProfilePicture2.svg")],
        ["Knu4d",   39, require("../assets/icons/exampleProfilePicture2.svg")],
    ];

    return(
        <View>
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header navigation={navigation} pageName={"Create Challenge"}/>
            </View>

            <View style={{alignSelf: "center", marginBottom: 127}}>
                <ProgressBarTemplate currentXp={2} maxXp={3} text={"2/3"} setWidth={400}/>
            </View>

            <View style={{paddingBottom: 36}}>
                <InputFieldWithBlueOutline  startingValue="Add Your Friends..."/>
            </View>

            <ScrollView style={{maxHeight: 300}}>
                {allAddedFriends.map(arr => (
                    <View key={arr[0]} style={{marginBottom: 11}}>
                        {displayFriendsInChallengeCorrectly(arr)}
                    </View>
                ))}
            </ScrollView>

            <Text style={[style.blackFontSize20, {paddingLeft: 17, marginTop: 17}]}>Select Starting Time</Text>
            <SliderComponent onChange={(value) => updateStartingTime(Math.round(value))}/>


            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextFunction}/>
            </View>
        </View>
    )
}