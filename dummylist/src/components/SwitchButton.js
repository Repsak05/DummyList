import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

export default function SwitchButton({textOne = "Friendship", textTwo = "Challenges", onPress})
{
    const [isSetToLeft, setIsSetToLeft] = useState(true);



    return(
        <View style={{width: "90%", flexDirection: "row", height: 38, width: 370, borderRadius: 5, backgroundColor: "#32618D", alignItems: "center", justifyContent: "space-around", alignSelf: "center"}}>
            <Pressable onPress={() => {setIsSetToLeft(true); onPress}}>
                <Text style={[isSetToLeft ? styles.isPressedText : styles.isNotPressedText, styles.allText]}>
                    {textOne}
                </Text>
            </Pressable>

            <Pressable onPress={() => {setIsSetToLeft(false); onPress}}>
                <Text style={[isSetToLeft ? styles.isNotPressedText : styles.isPressedText, styles.allText]}>
                    {textTwo}
                </Text>
            </Pressable>
        </View>
    )

}
const styles = StyleSheet.create({
    isPressedText: {
        backgroundColor: "#FFFFFF",
        fontFamily: "Oswald_400Regular", 
        color: "#040F0F",
        fontSize: 16,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 2, 
        borderBottomRightRadius: 10,
        
    },
    
    isNotPressedText: {
        backgroundColor: "#32618D",
        fontFamily: "Oswald_500Medium", 
        color: "#F6F6F6",
        fontSize: 16,
    },

    allText: {
        height: 28, width: 172, textAlign: "center"
    }
});
