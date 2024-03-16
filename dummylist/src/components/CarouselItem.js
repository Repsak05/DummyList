import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Pressable   } from 'react-native';
import styles from '../style.js'; 



export default function CarouselItem({navigation})
{
    function openCaroselItem()
    {
        console.log('Open carousel item')
        navigation.navigate('ChallengePage')

    }    
    return(
        <View style={styles.wrapper}>
            <Pressable onPress={() => openCaroselItem()} style={{width: "100%", height: "100%"}}>
                <View style={styles.carouselContainer}>
                    <ImageBackground source={require('../assets/images/Dims.png')} style={styles.carouselItem}>
                        <View style={styles.carouselTextBox}>
                            <Text style={styles.carouselText}>De Ekstreme Bananer</Text>
                        </View>
                    </ImageBackground>
                </View>
            </Pressable>
        </View>
    )
}