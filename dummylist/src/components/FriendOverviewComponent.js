import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

export default function FriendOverviewComponent({name, image, level})
{
    return(
        <View style={[style.roundedCorners, {backgroundColor: "#FFDAD2", width: 184, height: 167, padding: 9, flexDirection: "column"}]}>
            <Image source={image} style={[style.roundedCorners, {width: 166, height: 117}]}/>
            <View style={{flexDirection: "row", marginTop: 8, justifyContent: "space-between"}}>
                <Text style={style.redFontSize16}>@{name}</Text>
                <Text style={style.redFontSize16Regular}>Level {level}</Text>
            </View>
        </View>
    )

}