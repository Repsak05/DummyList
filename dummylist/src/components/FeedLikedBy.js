import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; //Apparently doesnt work
import style from "../style";

export default function FeedLikedBy({peopleWhoLikedThePost})
{
    if(!peopleWhoLikedThePost)
    { console.error("No pictures");}

    const valPic = "../assets/icons/exampleProfilePicture.svg"

    function returnNumberOfElementsFromArray(arr, num)
    {
        let newArr = [];
        for(let i = 0; i<num; i++)
        {
            if(i+1 > arr.length) return newArr;
            newArr.push(arr[i])
        }
        return(newArr)
    }

    const shownLikedPosts = returnNumberOfElementsFromArray(peopleWhoLikedThePost, 5);

    return (
        <View style={{marginLeft: 29, padding: 10, flexDirection: "row", }}>
            <Text style={[style.blackFontSize16]}>Liked by:</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5, marginLeft: 10 }}>
                {shownLikedPosts.map((element, index) => (
                    <Image key={index} style={{width: 38, height: 38, borderRadius: "50%", position: "absolute", left: index*19, zIndex: 5-index, opacity: 1- (0.20*index) }} source={{uri: element}} alt="PersonImg"/>
                ))}
            </View>
        </View>
    );
}