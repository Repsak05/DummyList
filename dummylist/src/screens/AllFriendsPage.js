import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import AddFriends from "../components/AddFriends.js";

export default function AllFriendsPage({navigation})
{
    const allFriends = [
        ["Erik", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["Knud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["Søren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Emil", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["1rik", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["K1nud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["Sø1ren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Emi1l", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Erik2", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["2Knud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["S2øren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Em2il", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Erik23", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["23Knud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["S23øren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Em23il", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Erik432", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["2K4nud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["S2ø4ren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Em2i4l", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
    ];
    return(
        <View style={{flex: 1}}>
            <View style={{marginTop: 55, marginBottom: 49}}>
                <Header pageName={`All Friends (${allFriends.length})`} navigation={navigation}/>
            </View>

            <ScrollView>
                {allFriends.map(arr => (
                    <View key={arr[0]}>
                        <AddFriends name={arr[0]} image={arr[1]} showLevel={true} level={arr[2]}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}