import React, {useState, useEffect} from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import AddFriends from "../components/AddFriends.js";
import FriendOverviewComponent from "../components/FriendOverviewComponent.js";

import { readData } from "../../firebase.js";

export default function FriendsPage({navigation})
{
    const [searchUsername, setSearchUsername] = useState("");
    const [hasFoundUser, setHasFoundUser] = useState(false);

    const [allUsers, setAllUsers] = useState() //Users from database

    useEffect(() => {
        async function getAllUsers()
        {
            try{
                const res = await readData("Users")
                const usersInDatabase = res.map(user => ({
                    username    : user.Username,
                    level       : user.Level,
                    picture     : {uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"},
                    mutual      : 404,
                    id          : user.id
                }));
                setAllUsers(usersInDatabase)
                console.log(usersInDatabase);
            }catch(err){
                console.error(err);
            }
        }

        getAllUsers();
    }, [])

    function handlePressLeft()
    {
        console.log("Left has been pressed!");
    }
    
    function handlePressRight()
    {
        console.log("Right has been pressed!");
        navigation.navigate("InvitedChallengesPage")
        //Navigate to challenges requests
    }
    
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
        navigation.navigate("AllFriendsPage")
    }

    useEffect(() => {
        // Ensures that hasFoundUser is always up to date
        let wasUsernameFoundInLoop = false;

        if(!searchUsername){
            setHasFoundUser(false);
            return;
        } 

        for (let i = 0; i < allUsers.length; i++) 
        {
            if (allUsers[i].username.toLowerCase().includes(searchUsername.toLowerCase())) {
                wasUsernameFoundInLoop = true;
                break;
            }
        }
        setHasFoundUser(wasUsernameFoundInLoop);

    }, [searchUsername, allUsers]);
    
    return(
        <View style={{flex: 1}}>
            <View style={{marginTop: 55, marginBottom: 20}}>
                <Header pageName={"Friendship"} navigation={navigation}/>
            </View>
            
            <ScrollView>
                <SwitchButton startingStateIsLeft={true} onPressLeft={handlePressLeft} onPressRight={handlePressRight}/>

                <View style={{marginTop: 17, marginBottom: 41}}>
                    <Text style={[style.blackFontSize25, {marginBottom: 5, textAlign: "center"}]}>Connect with Friends</Text>
                    <InputFieldWithBlueOutline onChange={(e) => setSearchUsername(e.target.value)} startingValue="Enter Friend's name..."/>
                </View>

                { allUsers?.map((arr, index) => (
                    <View key={index}>
                        {arr?.username.toLowerCase().includes(searchUsername.toLowerCase()) && !!searchUsername && (
                            <AddFriends hasLine={false} name={arr?.username} showMutualFriends={true} amountOfMutualFriends={arr?.mutual} showAddFriend={true} onPressAddFriend={() => {console.log("Added Friend");}}  image={arr?.picture} />
                        )}
                    </View>
                ))}
                {!hasFoundUser && (
                    <Text style={{textAlign: "center"}}>No User with Username: "{searchUsername}" was Found</Text>
                )}

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