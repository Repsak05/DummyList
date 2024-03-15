import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function Header({pageName})
{
    const profilePicture = require("../assets/icons/exampleProfilePicture.svg");
    
    return(
        <View style={{paddingHorizontal: 30, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
            <Image style={{width: 45, height: 45}} source={require("../assets/icons/arrowBack.svg")}/>
            <Text style={style.blackFontSize20}>{pageName}</Text>
            <Image style={{width: 45, height: 45, borderRadius: "50%", borderWidth: 5, borderColor: "#0477BF",}} source={profilePicture}/>
        </View>
    )
}