import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import ProfileUserInformation from "../components/ProfileUserInformation";
import ProfileAchievements from "../components/ProfileAchievements";
import ProfileChallengesOverview from "../components/ProfileChallengesOverview";

export default function ProfilePage({navigation})
{
    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#D0E4FF", position: "relative"}}>
            <Image style={{ width: "100%", height: 341}} source={require("../assets/icons/exampleProfilePicture.svg")}/>
            
            <View style={{position: "absolute", top: 55, left: 0, width: "100%"}}>
                <Header pageName={" "} navigation={navigation} isOnProfilePage={true}/>
            </View>

            <View style={{marginTop: 28}}>
                <ProfileUserInformation 
                    username={global.userInformation?.Username || "GuestUser#121"}
                    email={global.userInformation?.Email || "GuestEmail@gmail.com"}
                    level={global.userInformation?.Level || 404}
                    xpCurrent={40}
                />
            </View>

            <View style={{flexDirection: "column", marginTop: 15}}>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                    <ProfileAchievements typeNumber={1} value={2}/>
                    <ProfileAchievements typeNumber={2} value={10}/>
                </View>

                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: 11}}>
                    <ProfileAchievements typeNumber={3} value={4}/>
                    <ProfileAchievements typeNumber={4} value={19}/>
                </View>
            </View>

            <View style={{marginTop: 15}}>
                <ProfileChallengesOverview/>
            </View>

                

        </View>
    )
}