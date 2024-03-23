import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function AddFriends({name, image, level})
{
    return(
        <View style={{flexDirection: "column",}}>
            <View style={{flexDirection: "row", paddingLeft: 55, paddingBottom: 8}}>
                <Image source={image} style={{alignSelf: "center", width: 40, height: 40, borderRadius: 5, marginRight: 18}}/>
                <View style={{flexDirection: "column"}}>
                    <Text style={style.blackFontSize20}>@{name}</Text>
                    <Text style={style.greyFontSize13}>Level {level}</Text>
                </View>


            </View>
            <View
                style={{
                    alignSelf: "center",
                    borderBottomColor: "#9e9e9e",
                    borderBottomWidth: 3,
                    width: "90%",
                }}
            />
        </View>
    )

}