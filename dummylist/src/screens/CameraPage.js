
import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

import Header from '../components/Header';
import CameraComponent from '../components/CameraComponent';

export default function CameraPage({navigation, route})
{
    //?Want to display challengeName ?: read challengeID .challengeName

    const { task } = route.params || " ";
    const { challengeID } = route.params || " ";
    const { challengeName } = route.params || false;
    
    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            
            <View style={{marginTop: 55}}>
                <Header navigation={navigation} pageName={`"${task.taskDescription}"` || "Camera"}/>
            </View>

            <View style={[style.roundedCorners, {height: 800}]}>
                <CameraComponent taskRef={task} challengeName={challengeName} challengeID={challengeID} navigation={navigation}/>
            </View>

            {challengeName && (
                <Text style={[style.blackFontSize16, {textAlign: "center", marginBottom: 5}]}>Task From Challenge: {challengeName}</Text>
            )}
        </View>
    )
}