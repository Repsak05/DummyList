import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

export default function BackgroundBottomForStartingPage()
{
    return(
        <View style={{flex: 1}}>
            <View style={{position: "absolute", bottom: 0, right: 0, opacity: 0.5}}>
                <View style={{flexDirection: "column"}}>
                    <View style={{flexDirection: "row-reverse"}}>
                        <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.secondary, borderTopLeftRadius: 42, borderTopRightRadius: 42}}></View>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.primary, borderBottomRightRadius: 42, borderTopRightRadius: 42, borderTopLeftRadius: 42}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.secondary, borderBottomLeftRadius: 42, borderBottomRightRadius: 42}}></View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.tertiary, borderRadius: 42}}></View>
                    <View style={{width: 72, height: 72, backgroundColor: colors.keyColors.primary, borderTopLeftRadius: 42}}></View>
                </View>
            </View>
        </View>
    )
}



