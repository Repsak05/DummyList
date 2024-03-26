import React, { useState } from "react";
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import style from "../style";

export default function SliderComponent({onChange}) {
    const [sliderValue, setSliderValue] = useState(24);
    console.warn = () => {}; //Stops annoying warnings

    return (
        <View style={{ alignItems: "center" }}>
            <Text style={[style.blackFontSize20, {backgroundColor: "#D0E4FF", borderRadius: 10, paddingHorizontal: 10}]}>
                {Math.round(sliderValue)} hours
            </Text>
            <Slider
                style={{ width: 380, height: 50 }}
                value={sliderValue}
                onValueChange={(value) => {setSliderValue(value); onChange(value);}}
                minimumValue={1}
                maximumValue={72}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#D0E4FF"
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 380 }}>
                <Text style={style.blackFontSize16}>1 Hour</Text>
                <Text style={style.blackFontSize16}>72 Hours</Text>
            </View>
        </View>
    );
}
