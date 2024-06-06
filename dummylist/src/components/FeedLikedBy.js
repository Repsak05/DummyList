import React, { useEffect, useState,  } from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; //Apparently doesnt work
import style from "../style";
import { getProfilePic } from "./GlobalFunctions";

export default function FeedLikedBy({peopleWhoLikedThePost})
{   //TODO: Change from ID to ID's user: shownLikedPosts should contain ID's???
    const showAmountOfLikedBy = 5;

    function returnNumberOfElementsFromArray(arr, num)
    {
        if(arr){

            let newArr = [];
            for(let i = 0; i<num; i++)
            {
                if(i+1 > arr.length) return newArr;
                newArr.push(arr[i])
            }
            return(newArr)
        }
        return []
    }

    const [shownPic, setShownPic] = useState({})
    const shownLikedPosts = returnNumberOfElementsFromArray(peopleWhoLikedThePost, showAmountOfLikedBy);

    const [firstFewPosts, setFirstFewPosts] = useState(returnNumberOfElementsFromArray(peopleWhoLikedThePost, showAmountOfLikedBy)) 

    useEffect(() => {
        const themPics = returnNumberOfElementsFromArray(peopleWhoLikedThePost, showAmountOfLikedBy)
        setFirstFewPosts(themPics);

        async function getPics()
        {
            const themPics = returnNumberOfElementsFromArray(peopleWhoLikedThePost, showAmountOfLikedBy);
            try{
                
                if(themPics.length > 0)
                {
                    let allPics = {};
        
                    for(let id of themPics)
                    {
                        const personPic = await getProfilePic(id);
                        allPics[id] = personPic;
                    }

                    setShownPic(allPics);
                }
            }catch(err){
                console.log(err);
            }
        }
        getPics();

    }, [peopleWhoLikedThePost])

    return (
        <View style={{marginLeft: 19, padding: 10, flexDirection: "row", }}>
            <Text style={[style.blackFontSize16]}>Liked by: {shownLikedPosts.length ? "" : "None"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5, marginLeft: 10 }}>
                { firstFewPosts.map((element, index) => (
                        <Image key={index} style={{width: 38, height: 38, borderRadius: "50%", position: "absolute", left: index*19, zIndex: showAmountOfLikedBy-index, opacity: 1- ((1/showAmountOfLikedBy)*index) }} source={shownPic[element]} alt="PersonImg"/>
                ))}
            </View>
        </View>
    );
}