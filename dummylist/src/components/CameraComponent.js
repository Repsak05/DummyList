import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

import style from '../style';
import ButtonCamera from './ButtonCamera';

import { addToCollection, addToDocument, readSingleUserInformation, updateHasCompletedTask } from '../../firebase';
import { calculateLevel } from './GlobalFunctions';

export default function CameraComponent({taskRef, challengeID, navigation}) 
{ //TODO: Rewards should be depending on taskDifficulty
    
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
                console.log('Recording started. v..' + isRecording); 
                setIsRecording(true);
                const data = await cameraRef.current.recordAsync();
                console.log('Recording started. v2..' + isRecording + " | " + data.uri); 
                setVideoUri(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function stopRecording() {
        if (cameraRef) {
            try {
                console.log('Recording stopped...' + isRecording); 
                setIsLoading(true);
                setIsRecording(false);
                const data = await cameraRef.current.stopRecording();
                console.log('Recording stopped v2...' + isRecording); 
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
            let postUri;
            if (image) {
                postUri = image;
            } else if (videoUri) {
                postUri = videoUri;
            }
        
            async function createPostID(eachPlayer) {
                const gottenPostID = await addToCollection("Posts", {
                    PostedBy: global.userInformation.id,
                    TaskDescription: taskRef.taskDescription,
                    PostUri: postUri,
                    LikedBy: [],
                });

                await updateHasCompletedTask(challengeID, eachPlayer, taskRef, gottenPostID);
            }
    
            for (let eachPlayer of taskRef.friendsTask) {
                if (eachPlayer.friendID == global.userInformation.id) {
                    await createPostID(eachPlayer);
                    break;
                }
            }


            //Give rewards (XP &c.)
            await addToDocument("Users", global.userInformation.id, "XP", false, false, 20)
            const res = await readSingleUserInformation("Users", global.userInformation.id)
            const yourLevel = calculateLevel(res.XP);
            if(res.Level < yourLevel){
                await addToDocument("Users", global.userInformation.id, "Level", yourLevel, false);
            }
            
            navigation.navigate("RewardPage");

        } catch (err) {
            console.log("Error publishing the uri or giving reward");
            console.log(err);
            navigation.navigate("UploadErrorPage") //Might want to remove it?
        }
    }
    
    
    if (hasCameraPermission === false) {
        return <Text style={{textAlign: 'center', marginTop: 20}}>No access to camera. Please change it in your settings.</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {!image && !videoUri ? (
                <View style={{flex: 1, margin: 15, backgroundColor: "#A6290D"}}>
                    <Camera
                        style={{ flex: 1, margin: isRecording ? 10 : 0, backgroundColor: '#378' }}
                        type={type}
                        flashMode={flash}
                        ref={cameraRef}>
                    </Camera>
                </View> 
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
                        <ButtonCamera
                            source={require('../assets/icons/takePictureButtonIcon.svg')}
                            onPress={takePicture}
                            onLongPress={startRecording}
                            onPressOut={stopRecording}
                        />
                        {videoUri && (
                            <ButtonCamera source={require('../assets/icons/sendIcon.png')} onPress={postMedia} imageStyle={{ width: 40, height: 40 }} />
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

