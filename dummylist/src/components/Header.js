import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function Header({pageName})
{
    const profilePicture = require("../assets/icons/exampleProfilePicture.svg");
    

    function goBack()
    {
        console.log("Go back button has been clicked!")
    }

    function goToProfile()
    {
        console.log("Go to profile button has been clicked")
    }

    return(
        <View style={{paddingHorizontal: 30, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
            <Pressable onPress={() => goBack()}>
                <Image style={{width: 45, height: 45}} source={require("../assets/icons/arrowBack.svg")}/>
            </Pressable>
            <Text style={style.blackFontSize20}>{pageName}</Text>

            <Pressable onPress={() => goToProfile()}>
                <Image style={{width: 45, height: 45, borderRadius: 22.5, borderWidth: 5, borderColor: "#0477BF"}} source={profilePicture}/>
            </Pressable>

        </View>
    )
}