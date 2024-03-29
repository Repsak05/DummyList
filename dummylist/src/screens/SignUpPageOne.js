import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

export default function SignUpPageOne()
{
    const [username, setUsername] = useState("")

    function goToNextPage()
    {
        //___Ensure that username is unique
        console.log("Next: " + username);
    }
    return(
        <View style={{flex: 1, backgroundColor: "#D0E4FF"}}>
            <BackgroundTopForStartingPage/>

            <View style={{alignItems: "center", }}>
                <Text style={[style.blackFontSize64, {marginTop: "50%"}]}>Dummy List</Text>
                <Text style={[style.blackFontSize25, {marginTop: 34, marginBottom: 62, }]}>Sign Up</Text>

                <View style={{flexDirection: "column", width: "70%"}}>
                    <View style={{marginBottom: 20}}>
                        <EnterInformationLogInComponent
                            image={require("../assets/icons/userIcon.svg")}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <View style={{justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                            <Pressable onPress={() => console.log("Back")} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.secondary, paddingHorizontal: 20, paddingVertical: 5}}>
                                <Text>Back</Text>
                            </Pressable>
                            <Pressable onPress={() => goToNextPage()} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.primary, paddingHorizontal: 20, paddingVertical: 5}}>
                                <Text style={[style.blackFontSize13, {}]}>Next</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <BackgroundBottomForStartingPage/>

        </View>
    )
}