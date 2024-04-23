import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from 'react-native';
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";
import SliderComponent from "../components/SliderComponent.js";
import { readData, readSingleUserInformation } from "../../firebase.js";

export default function CreateChallengePageTwo({ navigation, route }) 
{ //Maybe use global.userInformation
    
    const { allChallengeValues } = route.params;
    const [allCurrentChallengeValues, setAllCurrentChallengeValues] = useState({
        ...allChallengeValues,

        //Adding yourself to friends (should be called participants/ChallengeMembers)
        friends : allChallengeValues.friends 
            ? [...allChallengeValues.friends, {user: global.userInformation.id, hasJoined: true}] 
            : {user: global.userInformation.id, hasJoined: true}
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
    }, [allCurrentChallengeValues.friends]);

    function updateStartingTime(val) {
        //Convert val to timestamp
        let today = new Date();
        today.setHours(today.getHours() + val);
        
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            startingTime: today
        });
    }

    function addFriendToChallenge(id) {
        if (!allCurrentChallengeValues.friends.some(friend => friend.user === id)) {
            setAllCurrentChallengeValues({
                ...allCurrentChallengeValues,
                friends: [...allCurrentChallengeValues.friends, { user: id, hasJoined: false }]
            });
        }
    }

    function removeFriendFromChallenge(id) {
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            friends: allCurrentChallengeValues.friends.filter(friend => friend.user !== id)
        });
    }

    function hasFriendBeenInvited(id){
        const friend = allCurrentChallengeValues.friends.find(friend => friend.user === id);
        if (friend) {
            return friend.hasJoined; //Prob false
        }
        return true;
    }


    function nextFunction() {
        console.log("Go to next!");        

        navigation.navigate("CreateChallengePageThree", {
            allCurrentChallengeValues
        });
    }

    function previousFunction() {
        console.log("Previous Clicked");
        navigation.navigate("CreateChallengePageOne", {
            allCurrentChallengeValues
        });
    }



    return (
        <View>
            <View style={{ marginTop: 55, marginBottom: 17 }}>
                <Header navigation={navigation} pageName={"Create Challenge"} />
            </View>

            <View style={{ alignSelf: "center", marginBottom: 127 }}>
                <ProgressBarTemplate currentXp={2} maxXp={3} text={"2/3"} setWidth={400} />
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
                {allUsers?.map((id, index) => (
                    <View key={index} style={{ marginBottom: 11 }}>
                        <AddFriends
                            id={id}
                            showLevel={true}
                            showCancelFriend={!hasFriendBeenInvited(id)}
                            showAddFriend={hasFriendBeenInvited(id)}
                            showFriendAdded={false}
                            onPressCancel={() => {removeFriendFromChallenge(id); console.log("cliked")}}
                            onPressAddFriend={() => {addFriendToChallenge(id); console.log("cliekeke")}}
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
