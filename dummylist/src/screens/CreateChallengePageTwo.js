import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from 'react-native';
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";
import SliderComponent from "../components/SliderComponent.js";
import { readSingleUserInformation } from "../../firebase.js";

export default function CreateChallengePageTwo({ navigation, route }) 
{ //Maybe use global.userInformation
    //TODO: Replace with the t-functions like: replace addFriendToChallenge with tAddFriendToChallenge
    //TODO: Missing to replace "Starts in..."/"Not accepted" statement depending on the right joinedMembers array
    //TODO: Correct navigation if TeamMode (With params)
    const { allChallengeValues } = route.params;
    const amountOfPages = allChallengeValues.gameMode == "Team-Mode" ? 4 : 3;

    const [allCurrentChallengeValues, setAllCurrentChallengeValues] = useState({
        ...allChallengeValues,

        //Adding yourself to friends (should be called participants/ChallengeMembers)
        invitedMembers :  allChallengeValues.invitedMembers 
            ? [...allChallengeValues.invitedMembers, global.userInformation.id]
            : [global.userInformation.id],

        joinedMembers :  allChallengeValues.joinedMembers 
            ? [...allChallengeValues.joinedMembers, global.userInformation.id]
            : [global.userInformation.id],
    });
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers() 
        {
            try {
                const res = await readSingleUserInformation("Users", global.userInformation.id)

                setAllUsers(res.Friends);
            } catch (err) {
                console.error(err);
            }
        }
        getAllUsers();
    }, [allCurrentChallengeValues.invitedMembers]);
    
    useEffect(() => {
        updateStartingTime(24); //Set initial starting time to be in one day
    }, [])

    function updateStartingTime(val) {
        //Convert val to timestamp
        let today = new Date();
        today.setHours(today.getHours() + val);
        
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            startingTime: today
        });
    }

    function tAddFriendToChallenge(id){
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            invitedMembers : [ ...allCurrentChallengeValues.invitedMembers, id]
        });
    }

    function tRemoveFriendFromChallenge(id){
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            invitedMembers : allCurrentChallengeValues.invitedMembers.filter(friend => friend !== id)
        });
    }
    function tHasFriendBeenInvited(id){
        const members = allCurrentChallengeValues.invitedMembers

        for(let ids of members)
        {
            if(ids == id){
                return true;
            } 
        }
        return false;
    }

    function nextFunction() {
        console.log("Go to next!");        


        if(allChallengeValues.gameMode == "Team-Mode"){
            navigation.navigate("CreateChallengeTeamModePage", {challenge : allCurrentChallengeValues});
        }else{
            navigation.navigate("CreateChallengePageThree", {
                allCurrentChallengeValues
            });
        }
    }

    function previousFunction() {
        console.log("Previous Clicked");
        navigation.navigate("CreateChallengePageOne", {
            allCurrentChallengeValues
        });
    }


    return (
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={{ marginTop: 55, marginBottom: 17 }}>
                <Header navigation={navigation} pageName={"Create Challenge"} />
            </View>

            <View style={{ alignSelf: "center", marginBottom: 127 }}>
                <ProgressBarTemplate currentXp={2} maxXp={amountOfPages} text={`2/${amountOfPages}`} setWidth={400} />
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
                {allUsers?.map((id, index) => (
                    <View key={index} style={{ marginBottom: 11 }}>
                        <AddFriends
                            id={id}
                            showLevel={true}
                            showCancelFriend={tHasFriendBeenInvited(id)}
                            showAddFriend={!tHasFriendBeenInvited(id)}
                            showFriendAdded={false}
                            onPressCancel={() => {tRemoveFriendFromChallenge(id)}}
                            onPressAddFriend={() => {tAddFriendToChallenge(id)}}
                        />
                    </View>
                ))}
            </ScrollView>

            <Text style={{ paddingLeft: 17, marginTop: 17, fontSize: 20 }}>Select Starting Time</Text>
            <SliderComponent onChange={(value) => updateStartingTime(Math.round(value))} />

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                <NextPreviousButton text={"Next"} onPress={nextFunction}/>
            </View>
        </View>
    );
}
