import React, { useEffect, useState } from "react";
import { View, Image, Text, Animated, Pressable } from 'react-native';
import style from "../style";

export default function UploadErrorPage({ navigation })
{ //TODO: Missing navigation to "Try Again": Might need ref to uri/task
    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff", justifyContent: "center", alignItems:"center", flexDirection: "column"}}>
            <Image source={require("../assets/icons/uploadErrorIcon.svg")} style={{width: 307, height: 261}}/>


            <Text style={[style.blackFontSize40, {marginTop: 8, marginBottom: 25}]}>Upload Error</Text>

            <View style={{flexDirection: "row", }}>
                <Pressable onPress={() => {console.log("Navigate somewhere")}} style={[style.roundedCornersSmall, {borderWidth: 3, borderColor: "#D0E4FF", marginHorizontal: 9, paddingVertical: 2, paddingHorizontal: 10}]}>
                    <Text style={[style.blackFontSize16, {}]}>
                        Try Again
                    </Text>
                </Pressable>
                <Pressable onPress={() => {navigation.navigate("Home")}} style={[style.roundedCornersSmall, {borderWidth: 3, borderColor: "#775A0B", marginHorizontal: 9, paddingVertical: 2, paddingHorizontal: 10}]}>
                    <Text style={[style.blackFontSize16, {}]}>
                        Go Home
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}