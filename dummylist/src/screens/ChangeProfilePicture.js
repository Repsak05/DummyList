import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { addSingleValueToDocument } from '../../firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ChangeProfilePicture({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(null); // 'camera' or 'library'
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  async function takePicture() {
    if (cameraRef) {
      try {
        setIsLoading(true);
        const data = await cameraRef.current.takePictureAsync({ quality: 1, base64: true });
        setImage(data.uri);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function savePicture() 
  {
    try {
    //   await MediaLibrary.saveToLibraryAsync(image);
        await addSingleValueToDocument("Users", global.userInformation.id, "ProfilePicture", image);
        global.userInformation.ProfilePicture = image;
        navigation.navigate("ProfilePage");
    } catch (err) {
      console.log(err);
    }
  }

  async function pickImage() {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (mode === 'camera' && hasCameraPermission === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (mode === 'library' && hasMediaLibraryPermission === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (mode === 'camera' && hasCameraPermission === false) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No access to camera. Please change it in your settings.</Text>;
  }

  if (mode === 'library' && hasMediaLibraryPermission === false) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No access to media library. Please change it in your settings.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {!image ? (
        !mode ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setMode('camera')}>
              <Text style={{ fontSize: 18, color: 'blue', marginBottom: 20 }}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('library')}>
              <Text style={{ fontSize: 18, color: 'green' }}>Choose from Library</Text>
            </TouchableOpacity>
          </View>
        ) : (
          mode === 'camera' && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Camera
                  style={{ flex: 1 }}
                  type={type}
                  flashMode={flash}
                  ref={cameraRef}
                  ratio={'9:16'} // Set the aspect ratio to match phone's vertical orientation
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)}>
                  <Text style={{ fontSize: 18, color: 'black' }}>Flash</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={{ marginHorizontal: 20 }}>
                  <Text style={{ fontSize: 18, color: 'black' }}>Take Picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: image }} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
            <TouchableOpacity onPress={savePicture}>
              <Text style={{ fontSize: 18, color: 'blue' }}>Save Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setImage(null)}>
              <Text style={{ fontSize: 18, color: 'red' }}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
