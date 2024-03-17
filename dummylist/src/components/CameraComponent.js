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
                console.log(image)
                const data = await cameraRef.current.takePictureAsync();
                console.log(data)
                setImage(data.uri);
            } catch(err){
                console.log(err);
            }
        }
    }

    async function postPicture()
    {
        if(image)
        {
            try{
                //Save image and post it on feed + give challenge points
            } catch(err){
                console.log(err)
            }
        }
        console.log("Post picture button pressed!")
    }

    if(hasCameraPermission == false){
        return <Text> No acces to camera. Please change it in your settings.</Text>
    }

    return(
        <View style={{flex: 1, }}>
            {!image ? 
                <Camera style={[style.roundedCorners, {flex: 1, margin: 10, backgroundColor: "#378"}]}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    >
                </Camera>  
                
                : <Image source={{uri: image}} style={[style.roundedCorners, {flex: 1, margin: 10, backgroundColor: "#1708"}]}/>
            }

            {!image ?
                <View style={{paddingBottom: 40, flexDirection: "row", alignSelf: "center"}}>
                    <ButtonCamera source={require("../assets/icons/flashIcon.svg")} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on :  Camera.Constants.FlashMode.off )} />
                    <ButtonCamera source={require("../assets/icons/takePictureButtonIcon.svg")} onPress={takePicture}/>
                    <ButtonCamera source={require("../assets/icons/changeCameraTypeIcon.svg")} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
                </View>

                : <View style={{paddingBottom: 40, flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', paddingHorizontal: 50}}>                    
                    <ButtonCamera source={require("../assets/icons/sendIcon.png")} onPress={postPicture} imageStyle={{width: 40, height: 40}} />
                    <ButtonCamera source={require("../assets/icons/deleteIcon.svg")} onPress={() => setImage(null)} imageStyle={{width: 40, height: 40}} />
                </View>
            }
        </View>
    )
}