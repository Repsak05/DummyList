import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

export default function BackgroundTopForStartingPage()
{
    return(
        <View style={{}}>
            <View style={{flexDirection: "column", opacity: 0.5, position: "absolute", top: 0, left: 0}}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.primary, borderBottomRightRadius: 42}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.secondary, borderTopLeftRadius: 42, borderBottomLeftRadius: 42,}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.secondary}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.secondary, borderTopRightRadius: 42, borderBottomRightRadius: 42}}></View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.tertiary, borderRadius: 42}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.primary, borderBottomRightRadius: 42, borderTopRightRadius: 42, borderTopLeftRadius: 42}}></View>
                </View>
            </View>
        </View>
    )
}