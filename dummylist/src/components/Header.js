import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function Header({pageName, navigation, isOnHomePage = false, isOnProfilePage = false})
{
    const mostLeftPicture = isOnHomePage ? require("../assets/icons/socialIcon.png") : require("../assets/icons/arrowBack.svg");
    const mostRightPicture = isOnProfilePage ? require("../assets/icons/settingsIcon.png") : require("../assets/icons/exampleProfilePicture.svg");
    

    function goBack()
    {
        if(isOnHomePage){
            console.log("Go To Socials Page!")
            //Navigate to social's page!
            navigation.navigate("FriendPage")

        } else {
            console.log("Go back button has been clicked!")
            navigation.navigate("Home")
        }
        
    }
    
    function goToProfile()
    {
        if(isOnProfilePage){
            console.log("Go to Settings");
            //Navigate to settings page!

        } else {
            console.log("Go to profile button has been clicked")
            navigation.navigate("ProfilePage")
        }
    }

    return(
        <View style={{paddingHorizontal: 30, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
            <Pressable onPress={() => goBack()}>
                <Image style={{width: 45, height: 45}} source={mostLeftPicture}/>
            </Pressable>
            <Text style={style.blackFontSize20}>{pageName}</Text>

            <Pressable onPress={() => goToProfile()}>
                <Image style={{width: isOnProfilePage ? 50: 45, height: isOnProfilePage ? 50: 45, borderRadius: 22.5, borderWidth: isOnProfilePage ? 0 : 5, borderColor: "#0477BF"}} source={mostRightPicture}/>
            </Pressable>

        </View>
    )
}