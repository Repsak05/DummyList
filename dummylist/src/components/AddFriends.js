import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

import { readSingleUserInformation } from "../../firebase";
import { defaultImage } from "../defaultValues";

export default function AddFriends({id, name, image, hasLine = true, showLevel = false, level, showMutualFriends = false, amountOfMutualFriends, showTimeAgo = false, timeAgo, showAddFriend = false, onPressAddFriend, showFriendAdded = true, showAcceptFriend = false, onPressAcceptFriend, onPressDenyFriend, showCancelFriend = false, onPressCancel})
{
    //Might wanna do the same (the following) with amountOfMutualFriends, showTimeAgo...


    const [theUsername, setTheUsername] = useState(name || "loading...");
    const [theLevel, setTheLevel] = useState(level || 404);
    const [imageSource, setImageSource] = useState(image || false);
    
    useEffect(() => {
        async function getData()
        {
            if(id){
                if(!name || !image || !level) //Only read db if any information is missing
                {
                    try{
                        const res = await readSingleUserInformation("Users", id);
    
                        if(theUsername == "loading..."){
                            setTheUsername(name || res.Username || "Invalid");
                        }
                        if(showLevel && theLevel == 404){
                            setTheLevel(level || res.Level || 1337);
                        }
                        if(!image){
                            setImageSource(res.ProfilePicture || {uri: defaultImage});
                        }
    
                    } catch(err){
                        console.error(err)
                    }
                }
            }
        } 

        getData();
    }, [])

    const [hasAddedFriend, setHasAddedFriend] = useState(false); //Currently being used for animations

    let stringContaining = "";
    if(showLevel)
    {
        stringContaining += "Level " + theLevel;
    }
    if(showLevel && showMutualFriends)
    {
        stringContaining += " | "
    }
    if(showMutualFriends){
        const addingVal = amountOfMutualFriends ? amountOfMutualFriends + " Mutual Friends": "No Mutual Friends";
        stringContaining += addingVal
    }
    if (showTimeAgo && timeAgo !== undefined) 
    {
        stringContaining += " • " + timeAgo + " ago";
    }

    return(
        <View style={{flexDirection: "column",}}>
            <View style={{flexDirection: "row", paddingLeft: 50, paddingBottom: 8}}>
                <Image source={imageSource} style={{alignSelf: "center", width: 40, height: 40, borderRadius: 5, marginRight: 18}}/>
                <View style={{flexDirection: "column"}}>
                    <Text style={style.blackFontSize20}>@{theUsername}</Text>
                    <Text style={style.greyFontSize13}>{stringContaining}</Text>
                </View>

                    <View  style={{flex: 1, flexDirection: "row-reverse", marginRight: "10%", alignItems: "center"}}>
                        {showAddFriend && (
                            <Pressable onPress={() => {onPressAddFriend(); setHasAddedFriend(showFriendAdded)}} style={{borderRadius: 5, width: hasAddedFriend ? 105 : 70, height: 29, backgroundColor: "#D3EC9E", alignItems: "center", justifyContent: "center"}}>
                                { hasAddedFriend ? (
                                    <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 3, alignItems: "center"}}>
                                        <Image style={{with: 18, height: 18}} source={require("../assets/icons/checkmarkDarkIcon.svg")}/>
                                        <Text style={[style.blackFontSize13, {textAlign: "center"}]}> Friend added</Text>
                                    </View>
                                ): (
                                    <Text style={[style.blackFontSize13, {textAlign: "center"}]}>Add Friend</Text>
                                )}
                            </Pressable>
                        )}
                        {showAcceptFriend && (
                            <View style={{flexDirection: "row"}}>
                                <Pressable onPress={onPressAcceptFriend} style={{borderRadius: 5, height: 29, backgroundColor: "#D3EC9E", alignItems: "center", justifyContent: "center", flexDirection: "row", paddingHorizontal: 5}}>
                                    <Image source={require("../assets/icons/acceptFriendRequest.svg")}/>
                                    <Text style={[style.blackFontSize13, {textAlign: "center", marginLeft: 10}]}>Accept Friend</Text>
                                </Pressable>
                                <Pressable onPress={onPressDenyFriend} style={{marginLeft: 5, borderRadius: 5, width: 29, height: 29, backgroundColor: "#FFDAD6", alignItems: "center", justifyContent: "center"}}>
                                    <Image source={require("../assets/icons/deleteIcon.svg")} style={{width: 18, height: 18}}/>
                                </Pressable>
                            </View>
                        )}
                        {showCancelFriend && (
                            <Pressable onPress={onPressCancel} style={{flexDirection: "row", borderRadius: 5, alignItems: "center", justifyContent: "flex-start", backgroundColor: "#73777F", width: 95, height: 26}}>
                                <Image source={require("../assets/icons/whiteCross.svg")} style={{width: 18, height: 18, marginLeft: 6, marginRight: 6}}/>
                                <Text style={style.whiteFontSize13}>Cancel</Text>
                            </Pressable>
                        )}
                    </View>
            </View>

            { hasLine && (
                <View
                    style={{
                        alignSelf: "center",
                        borderBottomColor: "#9e9e9e",
                        borderBottomWidth: 1,
                        width: "90%",
                    }}
                />
            )}
        </View>
    )

}