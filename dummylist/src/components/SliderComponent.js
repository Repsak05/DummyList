import React, { useState } from "react";
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import style from "../style";

export default function SliderComponent({onChange, timeReference = "Hour", min = 1, max = 72, initialValue = 24}) 
{
    const [sliderValue, setSliderValue] = useState(initialValue);
    console.warn = () => {}; //Stops annoying warnings


    function handleSliderChange(value) 
    {
        const newValue = Math.max(value, 1); //Handles bug: So value can't Less than minValue
        setSliderValue(newValue);
        onChange(newValue);
    }

    return (
        <View style={{ alignItems: "center" }}>
            <Text style={[style.blackFontSize20, {backgroundColor: "#D0E4FF", borderRadius: 10, paddingHorizontal: 10}]}>
                {Math.round(sliderValue)} {timeReference}s
            </Text>
            <Slider
                style={{ width: 380, height: 50 }}
                value={sliderValue}
                onValueChange={(value) => {handleSliderChange(value)}}
                minimumValue={min}
                maximumValue={max}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#D0E4FF"
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 380 }}>
                <Text style={style.blackFontSize16}>{min} {timeReference}</Text>
                <Text style={style.blackFontSize16}>{max} {timeReference}s</Text>
            </View>
        </View>
    );
}
