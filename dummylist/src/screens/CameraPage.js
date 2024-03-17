
import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from '../components/Header';
import CameraComponent from '../components/CameraComponent';

export default function CameraPage({navigation, route})
{
    const { title } = route.params || " ";
    
    return(
        <View style={{}}>
            
            <View style={{marginTop: 55}}>
                <Header navigation={navigation} pageName={title || "Camera"}/>
            </View>

            <View style={[style.roundedCorners, {height: 800}]}>
                <CameraComponent/>
            </View>
        </View>
    )
}