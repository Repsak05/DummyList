import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ButtonCamera({source, onPress, imageStyle})
{
    return(
        <TouchableOpacity onPress={onPress} style={style.buttonPicture}>
            <Image source={source} style={imageStyle}/>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    buttonPicture : {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

})