import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import ProfileUserInformation from "../components/ProfileUserInformation";
import ProfileAchievements from "../components/ProfileAchievements";

export default function ProfilePage({navigation})
{
    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#D0E4FF", position: "relative"}}>
            <Image style={{ width: "100%", height: 341}} source={require("../assets/icons/exampleProfilePicture.svg")}/>
            
            <View style={{position: "absolute", top: 55, left: 0, width: "100%"}}>
                <Header pageName={" "} navigation={navigation}/>
            </View>




            <View style={{marginTop: 28}}>
                <ProfileUserInformation username={"Kasper"} email={"example@gmail.com"}/>
            </View>

            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: 15 }}>
                <ProfileAchievements typeNumber={1} value={2}/>
                <ProfileAchievements typeNumber={2} value={10}/>
                <ProfileAchievements typeNumber={3} value={4}/>
                <ProfileAchievements typeNumber={4} value={19}/>
            </View>

                

        </View>
    )
}