import React, { useRef, useEffect, useState } from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

import Header from "../components/Header";

export default function SettingsPage({navigation}) 
{
    const settingsInformation = [
        [{description : "Account",  imageSrc : require("../assets/icons/settingsAccountIcon.svg"),  color : "#D0E4FF", onPress : () => navigation.navigate("AccountSettingsPage")},  {description: "Notification",   imageSrc : require("../assets/icons/settingsNotificationIcon.svg"), color : "#FFDF9D", onPress : () => navigation.navigate("NotificationSettingsPage")}],
        [{description : "Language", imageSrc : require("../assets/icons/settingsLanguageIcon.svg"), color : "#FFDAD2", onPress : () => navigation.navigate("LanguageSettingsPage")}, {description : "Post",          imageSrc : require("../assets/icons/settingsPostIcon.svg") ,        color : "#D3EC9E", onPress : () => console.log("Navigation here")}],
    ];    

    return(
        <View>
            <View style={{marginTop: 55, marginBottom: 40}}>
                <Header navigation={navigation} pageName={"Settings"} navigateToPage={"ProfilePage"}/>
            </View>

            <View style={{flexDirection: "column"}}>
                {settingsInformation.map((rowBox, index) => (
                    <View key={index} style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 39}}>
                        {rowBox.map((box, indexTwo) => (
                            <Pressable onPress={box.onPress} key={indexTwo} style={[style.roundedCorners, {backgroundColor: box.color, width: 175, height: 175, justifyContent:"center", paddingLeft: 18}]}>
                                <Image source={box.imageSrc} style={{width: 45, height: 45}}/>
                                <Text style={[style.blackFontSize20]}>{box.description}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}

                <Pressable onPress={() => {console.log("Sec")}} style={[style.roundedCorners,{backgroundColor: "#D9D9D9", justifyContent: "center", alignSelf:"center", height: 91, width: 381}]}>
                    <Text style={[style.blackFontSize20, {textAlign: "center"}]}>Security</Text>
                </Pressable>
            </View>
        </View>
    );
}
