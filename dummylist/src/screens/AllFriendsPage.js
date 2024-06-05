import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import AddFriends from "../components/AddFriends.js";
import { readSingleUserInformation } from "../../firebase.js";

export default function AllFriendsPage({navigation, route})
{ //TODO: Update to actual profilePicture
    //Maybe use global.userInformation?


    // ? Might need to create a useEffect if route.params is empty (in case of: link to the page - no navigation)
    const { allFriends } = route.params;
    const { allUsers } = route.params; //Can be used for DB improvement


    const exampleProfilePicture = "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg";
    const [yourFriends, setYourFriends] = useState([])

    useEffect(() => {
        async function friendsData()
        {
            try{
                let friendsInformation = []

                for(let id of allFriends)
                {
                    //! DB: No need for this call - can use allUsers from route.params
                    const res = await readSingleUserInformation("Users", id)

                    let personInformation = {
                        Username : res.Username,
                        ProfilePicture : {uri : res.ProfilePicture || exampleProfilePicture},
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