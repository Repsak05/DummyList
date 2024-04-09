import React from "react";
import { View, Image, Text, Scrollview, Pressable } from 'react-native';
import style from "../style";

export default function ProfileChallengesOverview()
{
    const allChallenges = [
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    ]
    return(
        <View style={[style.roundedCorners, {backgroundColor: "#F8F9FF", flex: 1, width: "90%", alignSelf: "center"}]}>
            <View style={{flexDirection: "column", paddingVertical: 19, paddingHorizontal: 36, overflow: "hidden"}}>
                <Text style={style.blackFontSize25}>Challenges</Text>
                <View style={{marginTop: 1, flexWrap: "wrap", overflow: "scroll", paddingVertical: 25}}>
                    <View style={[style.roundedCornersSmall, {flexDirection: "row", alignItems:"center",}]}>
                        {allChallenges.map((imgSource, index) => (
                            <Pressable key={index} onPress={() => {console.log("Navigate to your posts")}}>
                                <Image source={{uri: imgSource}} style={{backgroundColor: "#173578", width: 60, height: 60, marginBottom: 5, marginRight: 5, borderRadius: "50%"}}></Image>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}