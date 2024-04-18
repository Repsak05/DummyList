import React from "react";
import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import style from '../style.js'; 

export default function EnterInformationLogInComponent({image, imageTwo, onPressImageTwo, placeholder = "Username", value, onChange, typePassword = false})
{
    return(
        <View style={{flexDirection: "column", width: "100%"}}>
            <View style={{flexDirection: "row", justifyContent: imageTwo ? "space-between" : null}}>
                <View style={{flexDirection: "row", marginLeft: 20}}>
                    <Image style={{height: 29}}source={image}/>
                    
                    <KeyboardAvoidingView behavior="padding">
                        <TextInput
                            style={[style.blackFontSize16, {marginLeft: 10, paddingLeft: 10}]}
                            onChange={onChange}
                            placeholder={placeholder}
                            secureTextEntry={typePassword}
                            value={value}
                            />
                    </KeyboardAvoidingView>
                </View>
                
                {!!imageTwo && (
                    <Pressable onPress={onPressImageTwo}>
                        <Image style={{width: 30, }} source={imageTwo}/>
                    </Pressable>
                )}
            </View>
            <View style={{ marginTop: 5, alignSelf: "center", borderBottomColor: "#000000", borderBottomWidth: 3, width: "100%"}} />
        </View>
    )
}