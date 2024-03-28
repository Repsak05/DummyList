import React from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 

export default function EnterInformationLogInComponent({image, imageTwo, onPressImageTwo, placeholder = "Username", onChange, typePassword = false})
{
    return(
        <View style={{flexDirection: "column", width: "100%"}}>
            <View style={{flexDirection: "row", justifyContent: imageTwo ? "space-between" : null}}>
                <View style={{flexDirection: "row"}}>
                    <Image style={{height: 29}}source={image}/>
                    <TextInput
                        style={[style.blackFontSize16, {marginLeft: 10}]}
                        onChange={onChange}
                        placeholder={placeholder}
                        secureTextEntry={typePassword}
                        />
                </View>
                {!!imageTwo && (
                    <Pressable onPress={onPressImageTwo}>
                        <Image style={{width: 30, height: 30}} source={imageTwo}/>
                    </Pressable>
                )}
            </View>
            <View style={{ marginTop: 5, alignSelf: "center", borderBottomColor: "#000000", borderBottomWidth: 3, width: "100%"}} />
        </View>
    )
}