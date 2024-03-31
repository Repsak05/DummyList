import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

export default function WelcomePage({navigation})
{
    return(
        <View style={{flex: 1, backgroundColor: "#D0E4FF"}}>
             <BackgroundTopForStartingPage/>

            <View style={{alignItems: "center", }}>
                <Text style={[style.blackFontSize40, {marginTop: "50%", marginBottom: 20}]}>Welcome to Dummy List</Text>

                <View style={{alignItems: "center", width: "100%"}}>
                    <Pressable onPress={() => navigation.navigate("LogInPage")} style={[style.roundedCornersSmall, {width: "90%", backgroundColor: "#FFFFFF", paddingVertical: 3, marginBottom: 10, borderWidth: 3, borderColor: colors.keyColors.secondary}]}>
                        <Text style={[style.blackFontSize20, {textAlign: "center"}]}>Log In</Text>
                    </Pressable>


                    <Pressable onPress={() => navigation.navigate("SignUpPage")} style={[style.roundedCornersSmall, {width: "90%", backgroundColor: "#FFFFFF", paddingVertical: 3, marginBottom: 10, borderWidth: 3, borderColor: colors.keyColors.primary}]}>
                        <Text style={[style.blackFontSize20, {textAlign: "center"}]}>Sign Up</Text>
                    </Pressable>

                        <View
                        style={{
                            marginTop: 10,
                            marginBottom: 15,
                            alignSelf: "center",
                            borderBottomColor: "#000000",
                            borderBottomWidth: 2,
                            width: "90%",
                            }}
                        />
                    <Pressable onPress={() =>{ navigation.navigate("Home"); console.log("Might need to send to a page with where you can enter username");}} style={[style.roundedCornersSmall, {width: "90%", backgroundColor: "#FFFFFF", paddingVertical: 3, marginBottom: 10, borderWidth: 3, borderColor: colors.keyColors.tertiary}]}>
                        <Text style={[style.blackFontSize20, {textAlign: "center"}]}>Continue as a Guest</Text>
                    </Pressable>
                </View>
            </View>

            <BackgroundBottomForStartingPage/>
        </View>
    )
}