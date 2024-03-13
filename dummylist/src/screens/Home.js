import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, TouchableHighlight, ImageBackground   } from 'react-native';
import styles from '../style.js'; 

export default function Home()
{
    return(
        <View style={styles.wrapper}>
            <View style={styles.carouselContainer}>
                <ImageBackground source={require('../assets/images/Dims.png')} style={styles.carouselItem}>
                    <View style={styles.carouselTextBox}>
                        <Text>HEllo There</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}