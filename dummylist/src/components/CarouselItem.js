import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Pressable, Image   } from 'react-native';
import styles from '../style.js'; 
import colors from "../colors.js";

export default function CarouselItem({navigation, isPlacedInTheMiddle = false, title = "De Ekstreme Bananer", hasPlacement = true, extraStylesToBackground, extraText, onPressFunction})
{
    const indicationImage = isPlacedInTheMiddle ? require("../assets/icons/placedInTheMiddle.svg") : require("../assets/icons/placedMostRight.svg");
        
    return(
        <View style={[{justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center', width: "95%",  backgroundColor: "#f8f9ff"}]}>
            <Pressable onPress={() => onPressFunction()} style={[{width: "100%", height: "100%", marginBottom: 12}]}>
                <View style={styles.carouselContainer}>
                    <ImageBackground source={require('../assets/images/Dims.png')} style={[styles.carouselItem, extraStylesToBackground, {position: "relative"}]}>
                        {title && (
                            <>
                                <View style={[styles.carouselTextBox, {position: "absolute", bottom: 20, left: 0}]}>
                                    <Text style={styles.carouselText}>{title}</Text>
                                </View>
                                {extraText && (
                                    <View style={[{ position: "absolute", top: 15, right: 32 }]}>
                                        <Text style={styles.blackFontSize20}>{extraText}</Text>
                                    </View>
                                )}
                            </>
                        )}
                    </ImageBackground>
                </View>
            </Pressable>
            {hasPlacement && (
                <Image source={indicationImage}/>
            )}
        </View>
    )
}