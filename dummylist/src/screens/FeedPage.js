import React, { useState } from "react";
import { View, Image, Pressable, ImageBackground, ScrollView, Dimensions } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import FeedInformation from "../components/FeedInformation";
import FeedLikedBy from "../components/FeedLikedBy";

export default function FeedPage({ navigation }) {
    const exampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YoVyIWSCe7lLdwBFj3HAwPM-wUdrH5BI8w&s"; // Change later
    const yourProfilePicture = "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg";

    const exampleURI = [
        "https://as1.ftcdn.net/v2/jpg/05/68/23/98/1000_F_568239815_8NB11CB6LT2D3lBhDVa10jQ6qMYJKCzh.jpg",
        "https://as2.ftcdn.net/v2/jpg/05/16/81/87/1000_F_516818763_dO4FwzVNNpYhnqNd3x61PF5cKud5Or6i.jpg",
        "https://ipt.imgix.net/201444/x/0/",
        "https://static.photocdn.pt/images/articles/2018/05/07/articles/2017_8/landscape_photography_tips.webp",
        "https://media.istockphoto.com/id/530568719/photo/passenger-airplane-taking-off-at-sunset.jpg?s=612x612&w=0&k=20&c=XkAgyOR8kkY7kgfx2TtuXAilzWkJodleFDQbj_GEBXA=",
    ];

    const latestPosts = [
        //user, profilepic, title, Uri, likedBy 
        ["Kasper", exampleImage, "Eat a Raw Egg", exampleURI[0], [exampleImage, exampleImage, exampleImage, exampleImage]],
        ["Per", yourProfilePicture, "Do Something Cool!", exampleURI[1], [exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage]],
        ["Svend", exampleImage, "Jump Into the Sea", exampleURI[2], [exampleImage, exampleImage, exampleImage]],
        ["Erik", yourProfilePicture, "Buy a Gift for a Friend", exampleURI[3], [exampleImage]],
        ["Kasper", exampleImage, "Help a Stranger", exampleURI[4], [exampleImage, exampleImage, exampleImage, exampleImage, exampleImage]],
    ];

    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={{ flex: 1 }}>
             <View style={{ marginTop: 55, marginBottom: 10 }}>
                <Header navigation={navigation} pageName={"Feed"} />
            </View>

            <ScrollView pagingEnabled={true} horizontal={false}>
                {latestPosts.map((arr, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                        <ImageBackground source={{ uri: arr[3] }} style={[style.roundedCornersExtremeOpposite, { width: 410, height: 727, position: "relative", alignSelf: "center", marginBottom: 15, overflow: 'hidden' }]}>
                            <View style={{ position: "absolute", right: 0, top: "40%" }}>
                                <Pressable onPress={() => setIsLiked(!isLiked)}>
                                    <Image source={isLiked ? require("../assets/icons/isLiked.svg") : require("../assets/icons/notLiked.svg")} />
                                </Pressable>
                                <Pressable onPress={() => console.log("Take to your post / your camera ")}>
                                    <Image source={require("../assets/icons/cameraFeedIcon.svg")} />
                                </Pressable>
                            </View>

                            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                            <View style={{ position: "absolute", bottom: 15, left: 20 }}>
                                <FeedInformation username={arr[0]} profileImage={arr[1]} title={arr[2]} />
                            </View>
                        </ImageBackground>

                        <FeedLikedBy peopleWhoLikedThePost={[
                            isLiked ? yourProfilePicture : exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage, exampleImage
                        ]} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
