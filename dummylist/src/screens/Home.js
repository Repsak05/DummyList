import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, TouchableHighlight, ImageBackground   } from 'react-native';
import styles from '../style.js'; 

import { useFonts, Oswald_400Regular, Oswald_500Medium } from '@expo-google-fonts/oswald';


export default function Home()
{    
    let [fontsLoaded] = useFonts({
        Oswald_400Regular,
        Oswald_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return(
        <View style={styles.wrapper}>
            <View style={styles.carouselContainer}>
                <ImageBackground source={require('../assets/images/Dims.png')} style={styles.carouselItem}>
                    <View style={styles.carouselTextBox}>
                        <Text style={styles.carouselText}>De Ekstreme Bananer</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}