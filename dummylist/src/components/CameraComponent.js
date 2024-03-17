import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

import style from '../style';
import ButtonCamera from './ButtonCamera';

export default function CameraComponent() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [isRecording, setIsRecording] = useState(false);
    const [videoUri, setVideoUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    async function takePicture() {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImage(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function startRecording() {
        if (cameraRef) {
            try {
                console.log('Recording started. v..' + isRecording); // Log when recording starts
                setIsRecording(true);
                const data = await cameraRef.current.recordAsync();
                console.log('Recording started. v2..' + isRecording + " | " + data.uri); // Log when recording starts
                setVideoUri(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function stopRecording() {
        if (cameraRef) {
            try {
                console.log('Recording stopped...' + isRecording); // Log when recording stops
                setIsLoading(true);
                setIsRecording(false);
                const data = await cameraRef.current.stopRecording();
                console.log('Recording stopped v2...' + isRecording); // Log when recording stops
                setVideoUri(data.uri);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    }

    async function postMedia() {
        try {
            if (image) {
                // Save image and post it on feed + give challenge points
            } else if (videoUri) {
                // Save video and post it on feed + give challenge points
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera. Please change it in your settings.</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {!image && !videoUri ? (
                <Camera
                    style={[style.roundedCorners, { flex: 1, margin: 10, backgroundColor: '#378' }]}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}>
                </Camera>
            ) : (
                <>
                {/* Display video/image after getting it */}
                    {image ? (
                        <Image source={{ uri: image }} style={[style.roundedCorners, { flex: 1, margin: 10, backgroundColor: '#1708' }]} />
                        
                    ) : (
                        <Video
                            source={{ uri: videoUri }}
                            style={[style.roundedCorners, { flex: 1, margin: 10, backgroundColor: '#1708' }]}
                            useNativeControls
                        />
                    )}
                </>
            )}

            {!image && !videoUri ? (
                <View style={{ paddingBottom: 40, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                    <ButtonCamera source={require('../assets/icons/flashIcon.svg')} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} />
                    <View style={{ flexDirection: 'row' }}>
                        <ButtonCamera source={require('../assets/icons/takePictureButtonIcon.svg')} onPress={takePicture} />
                        {videoUri ? (
                            <ButtonCamera source={require('../assets/icons/sendIcon.png')} onPress={postMedia} imageStyle={{ width: 40, height: 40 }} />
                        ) : (
                            <>
                                {isRecording ? (
                                    <ButtonCamera source={require('../assets/splash.png')} onPress={stopRecording} imageStyle={{ width: 40, height: 40 }} />
                                ) : (
                                    <ButtonCamera source={require('../assets/splash.png')} onPress={startRecording} imageStyle={{ width: 40, height: 40 }} />
                                )}
                            </>
                        )}
                    </View>
                    <ButtonCamera source={require('../assets/icons/changeCameraTypeIcon.svg')} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} />
                </View>
            ) : (
                <View style={{ paddingBottom: 40, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <ButtonCamera source={require('../assets/icons/sendIcon.png')} onPress={postMedia} imageStyle={{ width: 40, height: 40 }} />
                        <ButtonCamera source={require('../assets/icons/deleteIcon.svg')} onPress={() => { setImage(null); setVideoUri(null); }} imageStyle={{ width: 40, height: 40 }} />
                    </View>
                    <ButtonCamera source={require('../assets/icons/changeCameraTypeIcon.svg')} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} />
                </View>
            )}
        </View>
    );
}

