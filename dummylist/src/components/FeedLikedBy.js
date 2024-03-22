import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; //Apparently doesnt work
import style from "../style";

export default function FeedLikedBy({peopleWhoLikedThePost})
{   
    const showAmountOfLikedBy = 5;

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

    const shownLikedPosts = returnNumberOfElementsFromArray(peopleWhoLikedThePost, showAmountOfLikedBy);

    return (
        <View style={{marginLeft: 29, padding: 10, flexDirection: "row", }}>
            <Text style={[style.blackFontSize16]}>Liked by:</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5, marginLeft: 10 }}>
                {shownLikedPosts.map((element, index) => (
                    <Image key={index} style={{width: 38, height: 38, borderRadius: "50%", position: "absolute", left: index*19, zIndex: showAmountOfLikedBy-index, opacity: 1- ((1/showAmountOfLikedBy)*index) }} source={{uri: element}} alt="PersonImg"/>
                ))}
            </View>
        </View>
    );
}