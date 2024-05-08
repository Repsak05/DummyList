import React, { useRef, useEffect, useState } from "react";
import { View, Image, Text, Animated, Pressable } from 'react-native';
import style from "../style";

import NextPreviousButton from "../components/NextPreviousButton";
import { getPositionInSortedCollection } from "../../firebase";

export default function RewardPage({navigation, route}) {
    const {xpGained} = route.params;
    const {yourRank} = route.params || -1337;
    const {amountOfTaskDone} = route.params || -1;

    const imageOffset = useRef(new Animated.Value(0)).current;

    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [rewardValue, setRewardValue] = useState([]);


    useEffect(() => {

        const animation = Animated.timing(imageOffset, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        });

        animation.start();
        startIncrementAnimation();

        setTimeout(() => {
            setIsAnimationDone(true);
        }, 1500);
    }, []);

    const rewards = [
        {title : "XP Gained", value : xpGained, color : "#FFDF9D"},
        {title : "Global Rank", value : yourRank, color : "#D0E4FF"},
        {title : "Complete Tasks", value : amountOfTaskDone || -1, color : "#FFDAD2" },
    ];

const startIncrementAnimation = () => {
    let duration = 1500 //Kinda doesnt work idk why
    const updatingFrequence = 1000 / 24 //FPS
    let updatedValues = [...rewardValue];

    for (let i = 0; i < rewards.length; i++) {
        let value = 0;
        const reward = rewards[i];
        let incrementingValue = reward.value/duration*updatingFrequence

        // console.log(incrementingValue)
        const interval = setInterval(() => {
            value+=incrementingValue

            if (value > reward.value) {
                updatedValues[i] = Math.round(reward.value);
                setRewardValue([...updatedValues])
                clearInterval(interval);
                
            } else {
                updatedValues[i] = Math.round(value);
                setRewardValue([...updatedValues]);
            }
        }, updatingFrequence); 
    }
};


    return (
        <View>
            <Image source={require("../assets/icons/rewardCelebrations.svg")} style={{alignSelf: "center", marginTop: 320, width: 307, height: 267}}/>
            <Text style={[style.blackFontSize40, {textAlign: "center", marginBottom: 23, marginTop: 8}]}>Upload Succesful</Text>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginHorizontal: 20}}>
                {rewards.map((reward, index) => (
                    <View key={index} style={{flexDirection: "column", backgroundColor: reward.color, borderRadius: 5, paddingVertical: 3, width:115}}>
                        <Text style={[style.blackFontSize16Medium, {textAlign: "center", }]}> {reward.title}</Text>
                        <Text style={[style.blackFontSize16Medium, { textAlign: "center" }]}> {rewardValue[index] || 0}</Text>
                    </View>
                ))}
            </View>

            {isAnimationDone && (
                <View style={{width: 100, height: 30, alignSelf: "center", marginTop: 32}}>
                    <NextPreviousButton text={"Continue"} onPress={() => {navigation.navigate("Home")}}/>
                </View>
            )}

            <Animated.Image
                source={require("../assets/icons/confetti.svg")}
                style={{
                    position: "absolute",
                    transform: [{
                        translateY: imageOffset.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        })
                    }]
                }}
            />

            {/* Display the incrementing reward value */}
        </View>
    );
}
