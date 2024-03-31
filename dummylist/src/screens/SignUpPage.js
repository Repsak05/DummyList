import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

export default function SignUpPage({navigation})
{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [typeTextSecure, setTypeTextSecure] = useState(true)
    const [currentState, setCurrentState] = useState(1);



    function goToNextPage()
    {
        //___Ensure that username all entered information is valid
        if (currentState == 3) 
        {
            navigation.navigate("Home")
        }
        console.log(`Username: ${username} | Email: ${email} | Password: ${password}`);
        setCurrentState(currentState + 1);
    }

    function goBack()
    {
        if(currentState == 1)
        {
            navigation.navigate("WelcomePage")
        } else {
            setCurrentState(currentState-1);
        }
    }
    return(
        <View style={{flex: 1, backgroundColor: "#D0E4FF"}}>
            <BackgroundTopForStartingPage/>

            <View style={{alignItems: "center", }}>
                <Text style={[style.blackFontSize64, {marginTop: "50%"}]}>Dummy List</Text>
                <Text style={[style.blackFontSize25, {marginTop: 34, marginBottom: 62, }]}>Sign Up</Text>

                <View style={{flexDirection: "column", width: "70%"}}>
                    <View style={{marginBottom: 20}}>
                        {currentState == 1 && (
                            <EnterInformationLogInComponent
                                value={username}
                                image={require("../assets/icons/userIcon.svg")}
                                placeholder={"Username"}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            )}
                        {currentState == 2 && (
                            <EnterInformationLogInComponent
                                value={email}
                                image={require("../assets/icons/emailIcon.svg")}
                                placeholder={'Email'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        )}
                        {currentState == 3 && (
                            <EnterInformationLogInComponent
                                value={password}
                                image={require("../assets/icons/passwordIcon.svg")}
                                placeholder={'Password'}
                                onChange={(e) => setPassword(e.target.value)}
                                imageTwo={require("../assets/icons/cantSeeIcon.svg")}
                                onPressImageTwo={() => setTypeTextSecure(!typeTextSecure)}
                                typePassword={typeTextSecure}
                            />
                        )}

                        <View style={{justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                            <Pressable onPress={() => goBack()} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.secondary, paddingHorizontal: 20, paddingVertical: 5}}>
                                <Text style={[style.blackFontSize13, {}]}>Back</Text>
                            </Pressable>
                            <Pressable onPress={() => goToNextPage()} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.primary, paddingHorizontal: 20, paddingVertical: 5}}>
                                <Text style={[style.blackFontSize13, {}]}>{currentState == 3 ? "Create" : "Next"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <BackgroundBottomForStartingPage/>

        </View>
    )
}