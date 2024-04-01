import React, { useState } from "react";
import { View, Image, Pressable, ImageBackground} from 'react-native';
import style from "../style";

import FeedInformation from "../components/FeedInformation";
import FeedLikedBy from "../components/FeedLikedBy";

export default function UploadedChallengeToFeed({arr}) //arr looks like this: //[username, profilepic, title, Uri, likedBy]
{
    //set to Database value
    const yourProfilePicture = "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg";
    const hasCompleteChallenge = false; 
    const [isLiked, setIsLiked] = useState(false); //Read value from database | on change: add new Value to database

    return(
        <View>
            <ImageBackground source={{ uri: arr[3] }} style={[style.roundedCornersExtremeOpposite, { width: 410, height: 727, position: "relative", alignSelf: "center", marginBottom: 15, overflow: 'hidden' }]}>
                <View style={{ position: "absolute", right: 0, top: "40%" }}>
                    <Pressable onPress={() => setIsLiked(!isLiked)}>
                        <Image source={isLiked ? require("../assets/icons/isLiked.svg") : require("../assets/icons/notLiked.svg")} />
                    </Pressable>
                    {hasCompleteChallenge ? (
                        <Pressable onPress={() => console.log("Challenge is alredy complete")}>
                            <Image style={{width: 60, height: 60}}source={require("../assets/icons/checkmarkIcon.svg")}/>
                        </Pressable>
                    ) : (
                        <Pressable onPress={() => console.log("Navigate to your post / your camera ")}>
                            <Image style={{width: 60, height: 60}}source={require("../assets/icons/cameraFeedIcon.svg")} />
                        </Pressable>
                    )}
                </View>
    
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                <View style={{ position: "absolute", bottom: 15, left: 20 }}>
                    <FeedInformation username={arr[0]} profileImage={arr[1]} title={arr[2]} />
                </View>
            </ImageBackground>
    
            <FeedLikedBy peopleWhoLikedThePost={isLiked ? [yourProfilePicture, ...arr[4]] : arr[4]} />

        </View>
    )
}