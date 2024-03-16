import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import {Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import style from '../style';
import ButtonCamera from './ButtonCamera';

export default function CameraComponent()
{
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null);


    useEffect(() => { //Asks for pemissions to Camera & CameraLibrary
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    async function takePicture()
    {
        console.log("Trying to take picture");
        if(cameraRef)
        {
            try{
                const data = await cameraRef.current.takePictureAsync();
                console.log(data)
                setImage(data.uri);
            } catch(err){
                console.log(err);
            }
        }
    }

    if(hasCameraPermission == false){
        return <Text> No acces to camera. Please change it in your settings.</Text>
    }

    return(
        <View style={{flex: 1, }}>
            <Camera
                style={[style.roundedCorners, {flex: 1, margin: 10, marginTop: "30%", backgroundColor: "#378"}]}
                type={type}
                flashMode={flash}
                ref={cameraRef}
                >
                <Text>Hello</Text>

            </Camera>


            <View style={{paddingBottom: 40, flexDirection: "row", alignSelf: "center"}}>
                <ButtonCamera source={require("../assets/icons/flashIcon.svg")} />
                <ButtonCamera source={require("../assets/icons/takePictureButtonIcon.svg")} onPress={takePicture}/>
                <ButtonCamera source={require("../assets/icons/changeCameraTypeIcon.svg")} />
            </View>
        </View>
    )
}