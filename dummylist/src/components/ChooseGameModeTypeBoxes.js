import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function ChooseGameModeTypeBoxes({colorType, image, title, subtitle, onPress, setWidth = 200, setHeight = 78, addStyle})
{
    let bgColor = "#127"
    switch(colorType)
    {
        case 1: 
            bgColor = "#A6290D";
            break;
        case 2:
            bgColor = "#0477BF";
            break;
        case 3:
            bgColor = "#F2B705";
            break;
        case 4:
            bgColor = "#F2E2C4";
            break;
        default:
            console.log("Invalid bgColor: Has not changed its default value");
            //Maybe add: bgColor = "colorType";
    }

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