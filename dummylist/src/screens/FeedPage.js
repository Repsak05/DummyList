import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import FeedInformation from "../components/FeedInformation";
import FeedLikedBy from "../components/FeedLikedBy";

export default function FeedPage()
{
    const exampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YoVyIWSCe7lLdwBFj3HAwPM-wUdrH5BI8w&s" //___Change later

    return(
        <View>
            <View style={{marginTop: 55}}>
                <Header pageName={"Feed"}/>
            </View>

            <FeedInformation username={"Kanlee"} profileImage={"../assets/icons/exampleProfilePicture.svg"} title={"Eat a Raw Onion"}/>
            <FeedLikedBy  peopleWhoLikedThePost={[
              exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage
            ]}/>
        </View>
    )

}