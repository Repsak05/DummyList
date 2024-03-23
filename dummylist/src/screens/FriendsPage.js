import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import AddFriends from "../components/AddFriends.js";
import FriendOverviewComponent from "../components/FriendOverviewComponent.js";

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
        ["Peter",   require("../assets/icons/exampleProfilePicture2.svg"),  3,  "1 h"],
        ["Poul",    require("../assets/icons/exampleProfilePicture2.svg"),  6,  "2 d"],
        ["Henrik",  require("../assets/icons/exampleProfilePicture2.svg"),  2,  "17 m"],  
    ]

    const allSentFriendRequests = [
        ["Erik", require("../assets/icons/exampleProfilePicture2.svg"), 9],
        ["Knud", require("../assets/icons/exampleProfilePicture2.svg"), 29],
        ["Søren", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
        ["Emil", require("../assets/icons/exampleProfilePicture2.svg"), 40],  
    ]

    const friendOverview = [
        ["Peter",   require("../assets/icons/exampleProfilePicture2.svg"),  3],
        ["Poul",    require("../assets/icons/exampleProfilePicture2.svg"),  6],
        ["Henrik",  require("../assets/icons/exampleProfilePicture2.svg"),  2],  
    ]

    function seeAllFriends()
    {
        //Navigate to new page
        console.log('"See all" has been pressed')
    }
    return(
        <View style={{flex: 1}}>
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
                            <AddFriends name={arr[0]} image={arr[1]} showMutualFriends={true} amountOfMutualFriends={arr[2]} showTimeAgo={true} timeAgo={arr[3]} showAcceptFriend={true} onPressAcceptFriend={() => console.log("Friend Request got accepted")} onPressDenyFriend={() => console.log("Friend Request got Denied")}/>
                        </View>
                    ))}
                </View>


                <View style={{flexDirection: "column", marginVertical: 17, }}>
                        <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9, position: "relative"}]}>Your Friends (20)
                        <Pressable onPress={seeAllFriends} style={{position: "absolute", backgroundColor: "#9CF1EE", height: 26, width: 77, borderRadius: 5, alignSelf: "center", justifyContent: "center", alignItems: "center", bottom: 2, transform: [{translateX: 40}]}}>
                                <Text style={[style.darkGreenFontSize13, {textAlign: "center"}]}> See all</Text>
                            </Pressable>
                        </Text>
                    <ScrollView horizontal={true} style={{flexDirection: "row", marginHorizontal: 10}}>
                        {friendOverview.map(arr => (
                            <View key={arr[0]} style={{marginRight: 14}}>
                                <FriendOverviewComponent name={arr[0]} image={arr[1]} level={arr[2]} />
                            </View>
                        ))}
                    </ScrollView>
                </View>


                <View style={{flexDirection: "column"}}>
                    <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9}]} >Requests Sent ({allSentFriendRequests.length})</Text>
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