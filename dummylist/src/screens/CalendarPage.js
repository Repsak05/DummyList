import React, { useState } from "react";
import { View, Pressable, ImageBackground, Text } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import FeedLikedBy from "../components/FeedLikedBy.js";

export default function CalendarPage({navigation}) 
{ //TODO: Get posts from DB
    const [onCurrentPost, setOnCurrentPost] = useState(0);

    function nextPost() {
        console.log("Look at next post")
        if (onCurrentPost < posts.length - 1) {
            setOnCurrentPost(onCurrentPost + 1);
        } else {
            navigation.navigate("ProfilePage");
        }
    }
    function previousPost() {
        console.log("Look at next post")
        if (onCurrentPost > 0) {
            setOnCurrentPost(onCurrentPost - 1);
        } else {
            navigation.navigate("ProfilePage");
        }
    }

    const likedBy = [
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg",
    ];

    const posts = [
        {
            likedBy: likedBy,
            taskDescription: "Eat an Apple in less than a minute",
            postUri: "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
        },
        {
            likedBy: likedBy,
            taskDescription: "No task description ahah available",
            postUri: "https://www.araoo.fr/media/images/beautiful-silhouette-image-1024x5.width-800.format-webp.webp",
        },
        {
            likedBy: likedBy,
            taskDescription: "Eat an Raw Onion",
            postUri: "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg",
        },
        {
            likedBy: likedBy,
            taskDescription: "Do something cool!",
            postUri: "https://www.scusd.edu/sites/main/files/main-images/camera_lense_0.jpeg",
        },
    ];

    return (
        <View>
            <View style={{ marginTop: 55, marginBottom: 10 }}>
                <Header pageName={"Memories"} navigation={navigation}/>
            </View>

            { posts[onCurrentPost] &&
                <>
                    <View style={{alignItems: "center"}}>
                        <View style={[style.roundedCornersOpposite, {flex: 1, overflow: 'hidden'}]}>
                            <ImageBackground source={{uri: posts[onCurrentPost].postUri}} style={[style.roundedCorners, {width: 410, height: 727, position: "relative", borderRadius: "50%"}]}>
                                <View style={{flexDirection: "row", width: "100%", alignContent: "center", position: "relative", top: 30, left: 0, marginHorizontal: 10}}>
                                    { posts.map((post, index) => (
                                        <View key={index} style={{width: ((410/(posts.length)) - 10 - (10/posts.length)), marginRight: 10, height: 3, backgroundColor: index == onCurrentPost ? "#FFF8F7" : "#c4c4c4"}}></View>
                                    ))}
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: '50%'}}>
                            <Pressable onPress={previousPost} style={{flex: 1}} />
                        </View>
                        <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: '50%'}}>
                            <Pressable onPress={nextPost} style={{flex: 1}} />
                        </View>
                    </View>
                    
                    <Text style={[style.blackFontSize16Medium, {marginLeft: 19, paddingHorizontal: 10}]}>"{posts[onCurrentPost].taskDescription}"</Text>
                    <FeedLikedBy peopleWhoLikedThePost={posts[onCurrentPost].likedBy} />
                </>
            }
        </View>
    );
}
