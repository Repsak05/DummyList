import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";

export default function Home({navigation})  //TODO: Ajust carouselItem's value: isPlacedInTheMiddle={true/false} (Depending on placement in array)
{   
    const [amountOfNotifications, setAmountOfNotifications] = useState(0);

    useEffect(() => { //Ensures correct amountOfNotifications
        if(amountOfNotifications == 0)
        {
            setAmountOfNotifications(false)
        }
    }, [amountOfNotifications])

    return(
        <View>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 29,}]}>
                <Header pageName={"Home"} navigation={navigation} isOnHomePage={true} hasNotifications={amountOfNotifications}/>
            </View>


            <View style={[styles.wrapper, {flexDirection: 'row', overflow: "scroll", marginBottom: 12 }]}>
                <View style={{width: "100%"}}>
                    <CreateChallengeComponent navigation={navigation} />
                </View>
                <View style={{width: "100%"}}>
                    <CarouselItem title={"De Ekstreme Bananer"} navigation={navigation} isPlacedInTheMiddle={true} />
                </View>
                <View style={{width: "100%"}}>
                    <CarouselItem title={"Home 404"} navigation={navigation} isPlacedInTheMiddle={false} />
                </View>
            </View>
    

            <View style={[styles.homeFeedContainer, styles.wrapper]}>
                <Pressable onPress={() => {console.log('Open feed'); navigation.navigate("FeedPage")}} style={{width: "100%", height: "100%"}}>
                    <ImageBackground source={require('../assets/images/test_image_1.jpg')} style={styles.homeFeedThumbnail}>
                        <View style={styles.homeFeedTextBox}>
                            <Text style={styles.homeFeedText}>Check here what your friends are up to</Text>
                            <Image source={require('../assets/icons/longArrowIcon.svg')}/>
                        </View>
                    </ImageBackground>
                </Pressable>
            </View>
        </View>
    )
}
