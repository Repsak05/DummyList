import React, { useState, useEffect } from "react";
import { View, Pressable, ImageBackground, Text, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import FeedLikedBy from "../components/FeedLikedBy.js";

export default function CalendarPage({navigation, route}) 
{ //TODO: Finish post settings
    const { chosenChallenge } = route.params;

    const [onCurrentPost, setOnCurrentPost] = useState(0);
    const [allPosts, setAllPosts] = useState(chosenChallenge || [])
    const [isEditTabOpen, setIsEditTabOpen] = useState(false)

    const heightOfOverlay = 125;
    const ifTooManyPostsChangeMargin = allPosts.length >= 20 ? 4 : 10 

    function nextPost() {
        console.log("Look at next post")
        if (onCurrentPost < allPosts.length - 1) {
            setOnCurrentPost(onCurrentPost + 1);
        } else {
            navigation.navigate("ProfilePage");
        }
    }
    function previousPost() {
        console.log("Look at previous post")
        if (onCurrentPost > 0) {
            setOnCurrentPost(onCurrentPost - 1);
        } else {
            navigation.navigate("ProfilePage");
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={{ marginTop: 55, marginBottom: 10 }}>
                <Header pageName={"Memories"} navigation={navigation} navigateToPage={"ProfilePage"}/>
            </View>

            { allPosts[onCurrentPost] ? (
                <>
                    <View style={{alignItems: "center"}}>
                        <View style={[style.roundedCornersOpposite, {flex: 1, overflow: 'hidden'}]}>
                            <ImageBackground source={{uri: allPosts[onCurrentPost].PostUri}} style={[style.roundedCorners, {width: 410, height: 727, position: "relative", borderRadius: "50%"}]}>
                                <View style={{flexDirection: "row", width: "100%", alignContent: "center", position: "relative", top: 30, left: 0, marginHorizontal: 10}}>
                                    { allPosts.map((post, index) => (
                                        <View key={index} style={{width: ((410/(allPosts.length)) - ifTooManyPostsChangeMargin - (20/allPosts.length)), marginRight: ifTooManyPostsChangeMargin, height: 3, backgroundColor: index == onCurrentPost ? "#FFF8F7" : "#c4c4c4"}}></View>
                                    ))}
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: '50%'}}>
                            <Pressable onPress={() => {previousPost(); setIsEditTabOpen(false);}} style={{flex: 1}} />
                        </View>
                        <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: '50%'}}>
                            <Pressable onPress={() => {nextPost(); setIsEditTabOpen(false);}} style={{flex: 1}} />
                        </View>
                    </View>
                    
                    <View style={{justifyContent: "space-between", flexDirection: "row", marginTop: 10}}>
                        {isEditTabOpen && (
                            <View style={[style.roundedCornersSmall, {height: heightOfOverlay, width: 125, backgroundColor: "#FFDAD2", position: "absolute", top: -(heightOfOverlay+0), right: 20, flexDirection: "column", padding: 10}]}>
                                <Pressable onPress={() => {console.log("Clicked: Missing function; Share")}} style={{marginBottom: 10}}>
                                    <Text style={style.blackFontSize16}>Share</Text>
                                </Pressable>
                                <Pressable onPress={() => {console.log("Clicked: Missing function; Delete")}} style={{marginBottom: 10}}>
                                    <Text style={style.blackFontSize16}>Delete</Text>
                                </Pressable>
                                <Pressable onPress={() => {console.log("Clicked: Missing function; Set as Thumbnail")}} style={{marginBottom: 10}}>
                                    <Text style={style.blackFontSize16}>Set as Thumbnail</Text>
                                </Pressable>
                                <Pressable style={{position: "absolute", top: 10, right: 10}} onPress={(() => setIsEditTabOpen(false))}>
                                    <Text style={style.blackFontSize16}>X</Text>
                                </Pressable>
                            </View> 
                        )}
                        <Text style={[style.blackFontSize16Medium, {marginLeft: 19, paddingHorizontal: 5}]}>"{allPosts[onCurrentPost].TaskDescription}"</Text>
                        <Pressable onPress={() => {console.log("Open edit tap"); setIsEditTabOpen(!isEditTabOpen);}}>
                            <Image style={{marginRight: 19}} source={require("../assets/icons/moreOptionsIcon.svg")}/>
                        </Pressable>
                    </View>
                    <FeedLikedBy peopleWhoLikedThePost={allPosts[onCurrentPost].LikedBy} />
                </>)


                : (<Text style={[style.blackFontSize25, {textAlign: "center", marginTop: 20}]}>Either Loading or No Posts Found</Text>)
            }
        </View>
    );
}
