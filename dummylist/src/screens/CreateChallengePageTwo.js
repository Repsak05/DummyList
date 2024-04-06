import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from 'react-native';
import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import AddFriends from "../components/AddFriends.js";
import SliderComponent from "../components/SliderComponent.js";
import { readData } from "../../firebase.js";

export default function CreateChallengePageTwo({ navigation, route }) {
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
        async function getAllUsers() {
            try {
                const res = await readData("Users");
                const usersInDatabase = res.map(user => ({
                    username: user.Username,
                    level: user.Level,
                    picture: { uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft" },
                    id: user.id,
                    hasJoined: allCurrentChallengeValues.friends.some(friend => friend.user === user.id)
                }));
                setAllUsers(usersInDatabase);
            } catch (err) {
                console.error(err);
            }
        }
        getAllUsers();
    }, [allCurrentChallengeValues.friends]);

    function updateStartingTime(val) {
        setAllCurrentChallengeValues({
            ...allCurrentChallengeValues,
            startingTime: val
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
                {allUsers.map(user => (
                    <View key={user.id} style={{ marginBottom: 11 }}>
                        <AddFriends
                            name={user.username}
                            showLevel={true}
                            level={user.level}
                            image={user.picture}
                            showCancelFriend={user.hasJoined}
                            showAddFriend={!user.hasJoined}
                            showFriendAdded={false}
                            onPressCancel={() => removeFriendFromChallenge(user.id)}
                            onPressAddFriend={() => addFriendToChallenge(user.id)}
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
