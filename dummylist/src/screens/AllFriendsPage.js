import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import AddFriends from "../components/AddFriends.js";
import { readSingleUserInformation } from "../../firebase.js";

export default function AllFriendsPage({navigation, route})
{ //TODO: Update to actual profilePicture
    //Maybe use global.userInformation?

    const { allFriends } = route.params;
    const exampleProfilePicture = "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft";
    const [yourFriends, setYourFriends] = useState([])

    useEffect(() => {
        async function friendsData()
        {
            try{
                let friendsInformation = []

                for(let id of allFriends)
                {
                    const res = await readSingleUserInformation("Users", id)

                    let personInformation = {
                        Username : res.Username,
                        ProfilePicture : {uri : exampleProfilePicture},
                        Level : res.Level,
                    }

                    friendsInformation.push(personInformation);
                }

                console.log(friendsInformation);
                setYourFriends(friendsInformation);
            }catch(err){
                console.error(err)
            }
        }

        friendsData();
    }, [])

    return(
        <View style={{flex: 1}}>
            <View style={{marginTop: 55, marginBottom: 49}}>
                <Header pageName={`All Friends (${yourFriends?.length || 0})`} navigation={navigation}/>
            </View>

            <ScrollView>
                {yourFriends?.map((friend, index) => (
                    <View key={index}>
                        <AddFriends name={friend.Username} image={friend.ProfilePicture} showLevel={true} level={friend.Level}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}