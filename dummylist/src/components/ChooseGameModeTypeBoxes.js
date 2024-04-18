import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function ChooseGameModeTypeBoxes({colorType, image, title, subtitle, onPress, setWidth = 200, setHeight = 78, addStyle})
{
    const colorOptions = {
        1 : "#A6290D",
        2 : "#0477BF",
        3 : "#F2B705",
        4 : "#F2E2C4",
    }

    let bgColor = colorOptions[colorType] || "#127"

    return(
        <Pressable onPress={() => onPress(title)} style={[style.roundedCorners, addStyle, {backgroundColor: bgColor, flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center", height: setHeight, width: setWidth}]}>
            <Image source={image} style={{width: 45, height: 45}}/>
            <View style={{flexDirection: "column", marginLeft: 10}}>
                <Text style={style.blackFontSize13}>{title}</Text>
                <Text style={style.blackFontSize10}>{subtitle}</Text>
            </View>
        </Pressable>
    )
}