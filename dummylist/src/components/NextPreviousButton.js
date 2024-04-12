import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function NextPreviousButton({text, onPress, })
{
    return(
        <Pressable onPress={onPress} style={[{borderTopLeftRadius: 10, borderTopRightRadius: 2, borderBottomLeftRadius: 2, borderBottomRightRadius: 10, borderWidth: 3, borderColor: "#D0E4FF", paddingHorizontal: 10}]}>
            <Text style={[style.blackFontSize16, {textAlign:"center"}]}>{text}</Text>
        </Pressable>
    )

}