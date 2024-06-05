import React, { useEffect, useState } from "react";
import { View, Image, Pressable, ImageBackground} from 'react-native';
import style from "../style";

import FeedInformation from "../components/FeedInformation";
import FeedLikedBy from "../components/FeedLikedBy";

import { addToDocument, removeFromDocumentInArr } from "../../firebase";

export default function UploadedChallengeToFeed({username, profilePicture, description, postUri, likedBy, postID}) //arr looks like this: //[username, profilepic, title, Uri, likedBy]
{   //TODO: Onlike show images (Currently thinking likedBy is img sources, tho its ID's)
    //set to Database value
    
    const hasCompleteChallenge = false; 
    const [isLiked, setIsLiked] = useState(false); //Read value from database | on change: add new Value to database
    
    useEffect(() => {
        console.log(likedBy)
        for(let person of likedBy){
            if(person == global.userInformation.id){
                setIsLiked(true)
            }
        }
    })

    async function updateLikedByDB()
    {
        if(!isLiked){
            console.log("Should add user to db")
            await addToDocument("Posts", postID, "LikedBy", global.userInformation.id)
            setIsLiked(true)
        } else {
            console.log("Should remove the user from the db")

            await removeFromDocumentInArr("Posts", postID, "LikedBy", global.userInformation.id)
            // likedBy = getCorrectLiked(likedBy); //! Need to do something liked this though with usestate()
            setIsLiked(false)

        }
    }

    function getCorrectLiked(arr)
    {
        //If isliked:
        let copy = []

        for(let id of arr)
        {
            if(id != global.userInformation.id)
            {
                copy.push(id);
            }
        }
        return copy
    }

    return(
        <View>
            <ImageBackground source={{ uri: postUri }} style={[style.roundedCornersExtremeOpposite, { width: 410, height: 727, position: "relative", alignSelf: "center", marginBottom: 15, overflow: 'hidden' }]}>
                <View style={{ position: "absolute", right: 0, top: "40%" }}>
                    <Pressable onPress={() => updateLikedByDB()}>
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
                    <FeedInformation username={username} profileImage={profilePicture} title={description} />
                </View>
            </ImageBackground>
    
            <FeedLikedBy peopleWhoLikedThePost={isLiked ? [global.userInformation?.id, ...getCorrectLiked(likedBy)] : likedBy} />

        </View>
    )
}