import React from "react";
import { View, Text } from 'react-native';
import style from "../style";

export default function ProgressBarTemplate({ text = "Level 5", textStyle = style.darkBlueFontSize13, maxXp = 3, currentXp = 1, setWidth = 100, setHeight = 20}) {
    return (
        <View style={{ width: setWidth, height: setHeight, borderRadius: 10, position: "relative", backgroundColor: "#F2E2C4", justifyContent: "center", alignItems: "center", }}>
            <View style={{ width: "100%", height: setHeight, borderRadius: 10, position: "absolute", left: 0, top: 0, overflow: "hidden" }}>
                <View style={{ width: `${currentXp / maxXp * 100}%`, height: setHeight, backgroundColor: "#0477BF" }}></View>
            </View>
            <Text style={textStyle}>{text}</Text>
        </View>
    );
}
