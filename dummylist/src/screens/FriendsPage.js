import React, {useState, useEffect} from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import InputFieldWithBlueOutline from "../components/InputFieldWithBlueOutline.js";
import AddFriends from "../components/AddFriends.js";
import FriendOverviewComponent from "../components/FriendOverviewComponent.js";

import { readData, readSingleUserInformation, addToDocument, removeFromDocumentInArr } from "../../firebase.js";
import { defaultAmountOfMutualFriends, defaultImage } from "../defaultValues.js";

export default function FriendsPage({navigation})
{ 
    //TODO: Change to use DB values (Profilepicture, mutualFriends...)
    //TODO: Maybe remove friends which you are awaiting response from, remove them from being searchable
        //TODO: Take care of situation where someone has sent you a friend request, and you also have send them a friendrequest
    
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
                    picture     : user.ProfilePicture ? {uri: user.ProfilePicture} : {uri : defaultImage},
                    mutual      : false || defaultAmountOfMutualFriends,
                    id          : user.id
                }));

                setAllUsers(usersInDatabase)
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
    

    function seeAllFriends()
    {
        //Navigate to new page
        console.log('"See all" has been pressed')
        navigation.navigate("AllFriendsPage", {allFriends : yourFriends, allUsers : allUsers});
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
            if (allUsers[i].username.toLowerCase().includes(searchUsername.toLowerCase()) && allUsers[i].id != global.userInformation.id)
            {
                wasUsernameFoundInLoop = true;
                break;
                
            }
        }
        setHasFoundUser(wasUsernameFoundInLoop);

    }, [searchUsername, allUsers]);
    
    
    const exampleTimeAgo = "1 d";

    const [yourFriends, setYourFriends] = useState(null);                             //Your Friends
    const [yourPendingFriendRequests, setYourPendingFriendRequests] = useState(null); //Those you can accept
    const [yourSentFriendRequests, setYourSentFriendRequests] = useState(null);       //Those you have sent

    useEffect(() => {
        async function initializeAllFriendItems()
        {
            try{
                const res = await readSingleUserInformation("Users", global.userInformation.id)

                setYourFriends(res.Friends || [])
                setYourSentFriendRequests(res.SentFriendRequests || [])
                setYourPendingFriendRequests(res.PendingFriendRequests || [])

            }catch(err){
                console.error(err)
            }
        }

        initializeAllFriendItems();

        //Following can be done in a better way
    }, [sendFriendRequest, cancelFriendRequest, acceptFriendRequest]);

    async function sendFriendRequest(ID)
    {
        try{
            await addToDocument("Users", global.userInformation.id, "SentFriendRequests", ID, true);
            await addToDocument("Users", ID, "PendingFriendRequests", global.userInformation.id, true);

        } catch(err){
            console.error(err)
        }
    }

    async function cancelFriendRequest(ID)
    {
        try{
            await removeFromDocumentInArr("Users", global.userInformation.id, "SentFriendRequests", ID);
            await removeFromDocumentInArr("Users", ID, "PendingFriendRequests", global.userInformation.id);

        } catch(err){
            console.error(err)
        }
    }

    async function acceptFriendRequest(ID)
    {
        try{
            await addToDocument("Users", global.userInformation.id, "Friends", ID);
            await addToDocument("Users", ID, "Friends", global.userInformation.id);

            await removeFromDocumentInArr("Users", global.userInformation.id, "PendingFriendRequests", ID)
            await removeFromDocumentInArr("Users", ID, "SentFriendRequests", global.userInformation.id)

        }catch(err){
            console.error(err)
        }
    }

    async function declineFriendRequest(ID){
        try{
            await removeFromDocumentInArr("Users", global.userInformation.id, "PendingFriendRequests", ID);
            await removeFromDocumentInArr("Users", ID, "SentFriendRequests", global.userInformation);

        }catch(err){
            console.error(err);
        }
    }

    function getImageFromID(id)
    {
        // console.log(allUsers);
        for(let users in allUsers)
        {
            const user = allUsers[users];

            if(user.id == id)
            {
                return user.ProfilePicture; //!Doesnt seem to work 
            }

        }
        console.log("No image found for user: " + id);
    }

    function isElementInArray(element, arr = yourFriends, includeYourID = true)
    {
        for(let friends of arr)
        {
            if(friends == element ) 
            {
                return true
            }
        }

        if(includeYourID && global.userInformation.id == element) {return true}

        return false;
    }
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

                { allUsers?.map((friend, index) => (
                    <View key={index}>
                        {friend?.username.toLowerCase().includes(searchUsername.toLowerCase()) && !!searchUsername && !isElementInArray(friend?.id) && (
                            <AddFriends hasLine={false} name={friend?.username} showMutualFriends={true} amountOfMutualFriends={friend?.mutual} showAddFriend={true} onPressAddFriend={() => {sendFriendRequest(friend?.id)}}  image={friend?.picture} />
                        )}
                    </View>
                ))}
                {!hasFoundUser && (
                    <Text style={{textAlign: "center"}}>No User with Username: "{searchUsername}" was Found</Text>
                )}

                <View style={{flexDirection: "column", marginTop: 17}}>
                    {yourPendingFriendRequests && (
                        <View>
                            <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9}]} >Friend Requests ({yourPendingFriendRequests?.length || 0})</Text>

                            {yourPendingFriendRequests?.map((id, index) => (
                                <View key={index}>
                                    <AddFriends id={id} image={getImageFromID(id)} showMutualFriends={true} amountOfMutualFriends={defaultAmountOfMutualFriends} showTimeAgo={true} timeAgo={exampleTimeAgo} showAcceptFriend={true} onPressAcceptFriend={() => {console.log("Friend Request got accepted"); acceptFriendRequest(id);}} onPressDenyFriend={() => {console.log("Friend Request got Denied"); declineFriendRequest(id);}}/>
                                </View>
                            ))}
                        </View>
                    )}
                </View>


                <View style={{flexDirection: "column", marginVertical: 17, }}>
                        <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9, position: "relative"}]}>Your Friends ({yourFriends?.length || 0})
                        <Pressable onPress={seeAllFriends} style={{position: "absolute", backgroundColor: "#9CF1EE", height: 26, width: 77, borderRadius: 5, alignSelf: "center", justifyContent: "center", alignItems: "center", bottom: 2, transform: [{translateX: 40}]}}>
                                <Text style={[style.darkGreenFontSize13, {textAlign: "center"}]}> See all</Text>
                            </Pressable>
                        </Text>
                    <ScrollView horizontal={true} style={{flexDirection: "row", marginHorizontal: 10}}>
                        {yourFriends?.slice(0, 3).map((id, index) => (
                            <View key={index} style={{marginRight: 14}}>
                                <FriendOverviewComponent id={id} image={getImageFromID(id)}/>
                            </View>
                        ))}
                    </ScrollView>
                </View>


                <View style={{flexDirection: "column"}}>
                    <Text style={[style.blackFontSize25, {textAlign: "center", marginBottom: 9}]} >Requests Sent ({yourSentFriendRequests?.length || 0})</Text>
                    {yourSentFriendRequests?.map((id, index) => (
                        <View key={index}>
                            <AddFriends id={id} image={getImageFromID(id)} showLevel={true} showCancelFriend={true} onPressCancel={() => {console.log("Friend Request got canceled"); cancelFriendRequest(id);}}/>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}