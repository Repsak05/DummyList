import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import AddFriends from "../components/AddFriends.js";

export default function FriendPage({navigation})
{

    function handlePressLeft()
    {
        console.log("Left has been pressed!");
    }
    
    function handlePressRight()
    {
        console.log("Right has been pressed!");
        //Navigate to challenges requests
    }
     
    const searchedFriend = ["Peter", require("../assets/icons/exampleProfilePicture2.svg"), 5]

    const allFriendRequests = [
        ["Peter", require("../assets/icons/exampleProfilePicture2.svg"), 5],
        ["Poul", require("../assets/icons/exampleProfilePicture2.svg"), 3],
        ["Henrik", require("../assets/icons/exampleProfilePicture2.svg"), 8],  
    ]

    const allSentFriendRequests = [
        ["Erik", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["Knud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["Søren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
    ]

    return(
        <View>
            <View style={{marginTop: 55, marginBottom: 20}}>
                <Header pageName={"Friendship"} navigation={navigation}/>
            </View>
            
            <ScrollView>
                <SwitchButton onPressLeft={handlePressLeft} onPressRight={handlePressRight}/>

                <View style={{marginTop: 17, marginBottom: 41}}>
                    <Text style={[style.blackFontSize25, {marginBottom: 5, textAlign: "center"}]}>Connect with Friends</Text>
                    <InputFieldWithBlueOutline startingValue="Enter Friend's name..."/>
                </View>

                <AddFriends hasLine={false} name={searchedFriend[0]} showMutualFriends={true} amountOfMutualFriends={searchedFriend[2]} showAddFriend={true} onPressAddFriend={() => console.log("Added Friend")}  image={searchedFriend[1]} />

                <View style={{flexDirection: "column", marginTop: 17}}>
                    <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9}]} >Friend Requests ({allFriendRequests.length})</Text>

                    {allFriendRequests.map(arr => (
                        <View key={arr[0]}>
                            <AddFriends name={arr[0]} image={arr[1]} showMutualFriends={true} amountOfMutualFriends={arr[2]} showAcceptFriend={true} onPressAcceptFriend={() => console.log("Friend Request got accepted")} onPressDenyFriend={() => console.log("Friend Request got Denied")}/>
                        </View>
                    ))}
                </View>


                <Text style={{marginVertical: 30}}>SOMETGHING</Text>

                <View style={{flexDirection: "column"}}>
                    {allSentFriendRequests.map(arr => (
                        <View key={arr[0]}>
                            <AddFriends name={arr[0]} image={arr[1]} showLevel={true} level={arr[2]} showCancelFriend={true} onPressCancel={() => console.log("Friend Request got canceled")}/>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}