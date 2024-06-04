import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

import Notification from "./Notification";
import { readSingleUserInformation } from "../../firebase";

export default function Header({pageName, navigation, isOnHomePage = false, isOnProfilePage = false, hasNotifications = 0})
{
    const [profilePicture, setProfilePicture] = useState();
   
    const mostLeftPicture = isOnHomePage ? require("../assets/icons/socialIcon.png") : require("../assets/icons/arrowBack.svg");
    const mostRightPicture = isOnProfilePage ? require("../assets/icons/settingsIcon.png") : require("../assets/icons/exampleProfilePicture.svg");
    
    useEffect(() => {
        async function getYourProfilePicture()
        {
            try{
                // const profileInfo = await readSingleUserInformation("Users", global.userInformation.id);
                isOnProfilePage ? setProfilePicture(require("../assets/icons/settingsIcon.png")) : setProfilePicture({uri: global.userInformation.ProfilePicture} || setProfilePicture(require("../assets/icons/exampleProfilePicture.svg")));

            }catch(err){
                console.error(err);
            }
        }

        const interval = setInterval(() => {
            if (global.userInformation && global.userInformation.id) {
                console.log(global.userInformation.id);
                clearInterval(interval);
                getYourProfilePicture();
            }
        }, 300);

    }, [])
    function goBack()
    {
        if(isOnHomePage){
            console.log("Go To Socials Page!")
            navigation.navigate("FriendsPage")

        } else {
            console.log("Go back button has been clicked!")
            navigation.navigate("Home")
        }
        
    }
    
    function goToProfile()
    {
        if(isOnProfilePage){
            console.log("Go to Settings");
            navigation.navigate("SettingsPage")

        } else {
            console.log("Go to profile button has been clicked")
            navigation.navigate("ProfilePage")
        }
    }

    return(
        <View style={{paddingHorizontal: 30, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
            <Pressable onPress={() => goBack()}>
                <Image style={{width: 45, height: 45}} source={mostLeftPicture}/>

                {hasNotifications && isOnHomePage 
                ? (
                    <View style={{position: "absolute", right: -0, top: -12}}>
                        <Notification amounts={hasNotifications}/>
                    </View>
                
                ): <></>}

            </Pressable>

            <Text style={style.blackFontSize20}>{pageName}</Text>

            <Pressable onPress={() => goToProfile()}>
                <Image style={{width: isOnProfilePage ? 50: 45, height: isOnProfilePage ? 50: 45, borderRadius: 22.5, borderWidth: isOnProfilePage ? 0 : 5, borderColor: "#0477BF"}} source={profilePicture}/>
            </Pressable>

        </View>
    )
}