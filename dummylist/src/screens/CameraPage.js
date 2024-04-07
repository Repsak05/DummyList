
import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from '../components/Header';
import CameraComponent from '../components/CameraComponent';

export default function CameraPage({navigation, route})
{
    const { task } = route.params || " ";
    
    return(
        <View style={{}}>
            
            <View style={{marginTop: 55}}>
                <Header navigation={navigation} pageName={`"${task.taskDescription}"` || "Camera"}/>
            </View>

            <View style={[style.roundedCorners, {height: 800}]}>
                <CameraComponent taskRef={task}/>
            </View>
        </View>
    )
}