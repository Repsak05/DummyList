import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function AddFriends({name, image, hasLine = true, showLevel = false, level, showMutualFriends = false, amountOfMutualFriends, showTimeAgo = false, timeAgo, showAddFriend = false, onPressAddFriend, showAcceptFriend = false, onPressAcceptFriend, onPressDenyFriend, showCancelFriend = false, onPressCancel})
{
    let stringContaining = "";
    if(showLevel)
    {
        stringContaining += "Level " + level;
    }
    if(showLevel && showMutualFriends)
    {
        stringContaining += " | "
    }
    if(showMutualFriends){
        const addingVal = amountOfMutualFriends ? amountOfMutualFriends + " Mutual Friends": "No Mutual Friends";
        stringContaining += addingVal
    }
    if(showTimeAgo)
    {
        stringContaining += " • " + timeAgo;
    }

    return(
        <View style={{flexDirection: "column",}}>
            <View style={{flexDirection: "row", paddingLeft: 55, paddingBottom: 8}}>
                <Image source={image} style={{alignSelf: "center", width: 40, height: 40, borderRadius: 5, marginRight: 18}}/>
                <View style={{flexDirection: "column"}}>
                    <Text style={style.blackFontSize20}>@{name}</Text>
                    <Text style={style.greyFontSize13}>{stringContaining}</Text>
                </View>

                    <View  style={{flex: 1, flexDirection: "row-reverse", marginRight: "15%", alignItems: "center"}}>
                        {showAddFriend && (
                            <Pressable onPress={onPressAddFriend} style={{borderRadius: 5, width: 70, height: 29, backgroundColor: "#D3EC9E", alignItems: "center", justifyContent: "center"}}>
                                <Text style={[style.blackFontSize13, {textAlign: "center"}]}>Add Friend</Text>
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
                        borderBottomWidth: 3,
                        width: "90%",
                    }}
                />
            )}
        </View>
    )

}