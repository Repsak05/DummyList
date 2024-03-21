import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image   } from 'react-native';
import styles from '../style.js'; 

import CarouselItem from "../components/CarouselItem.js";
import Header from "../components/Header.js";

export default function Home({navigation})
{    
    return(
        <View style={styles.wrapper}>
            <View style={{width: "100%", marginTop: 55, }}>
                <Header pageName={"Home"} navigation={navigation} isOnHomePage={true}/>
            </View>


            <CarouselItem navigation={navigation}></CarouselItem>

            <View style={styles.homeFeedContainer}>
                <Pressable onPress={() => console.log('Open feed')} style={{width: "100%", height: "100%"}}>
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