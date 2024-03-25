import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

export default function FeedInformation({title, profileImage, username})
{
    //Change following consts to the parameters (without "val...")
    const valProfileImage = "../assets/icons/exampleProfilePicture.svg";
    const valTitle = "Do Sport for 20 min";
    const valUsername = "@Keerti123";

    return(
        <View style={{flexDirection: "row"}}>
            <Image style={{borderRadius: "50%", borderColor: "#001D34", borderWidth: 5, width: 50, height: 50 }} source={{uri : profileImage}}/>
            <View style={{flexDirection: "column", marginLeft: 10}}>
                <Text style={style.whiteFontSize16}>"{title}"</Text>
                <Text style={style.greyFontSize10}>{username}</Text>
            </View>
        </View>
    )

}