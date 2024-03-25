import React, { useState } from "react";
import { View, TextInput } from 'react-native';
import style from "../style";

export default function InputFieldWithBlueOutline({startingValue = "Enter value...", onChange}) {
    const [inputFieldValue, setInputFieldValue] = useState("");

    return (
        <View style={[style.roundedCorners, { alignSelf: "center", justifyContent: "center",  borderColor: "#D0E4FF", borderWidth: 10, height: 65, width: "90%" }]}>
            <TextInput
                onChange={onChange}
                style={[style.blackFontSize20, {paddingHorizontal: 20, height: "100%", opacity: 0.7}]}
                onChangeText={changedValue => setInputFieldValue(changedValue)}
                value={inputFieldValue}
                placeholder={startingValue} 
                />
        </View>
    );
}
