import React, {useState, useEffect} from "react";
import { View, ScrollView, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/progressBarTemplate.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";
import SliderComponent from "../components/SliderComponent.js";

import {readData, addToCollection, readSingleUserInformation, firestore} from "../../firebase.js";


export default function CreateChallengePageTwo({navigation, route})
{ //TODO___ Make searchbar for friends work

    const { allChallengeValues } = route.params;
    const [allCurrentChallengeValues, setAllCurrentChallengeValues] = useState(allChallengeValues)

    const [allUsers, setAllUsers] = useState() //___Change to allFriends instead

    useEffect(() => {
        async function getAllUsers()
        {
            try{
                const res = await readData("Users")
                const usersInDatabase = res.map(user => ({ //Change picture to the real one
                    username    : user.Username,
                    level       : user.Level,
                    picture     : {uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"},
                    id          : user.id
                }));
                setAllUsers(usersInDatabase)
            }catch(err){
                console.error(err);
            }
        }
        getAllUsers();
    }, [])

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
        const isFriendAdded = allCurrentChallengeValues.friends.includes(arr[0]); //Might cause some edge-case problems: .includes becuase; d3d3 true xxxd3d3xxx

        return (
            <AddFriends name={arr.username} showLevel={true} level={arr.level} image={arr.picture} 
                showCancelFriend={isFriendAdded}
                showAddFriend={!isFriendAdded}
                onPressCancel={() => removeNameFromChallenge(arr.id)}
                onPressAddFriend={() => addFriendsToChallenge(arr.id)}
            />
        );
    }

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
                {allUsers?.map(arr => (
                    <View key={arr.id} style={{marginBottom: 11}}>
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