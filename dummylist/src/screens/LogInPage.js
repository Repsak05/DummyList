import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";
import SignUpPageOne from "./SignUpPage.js";


export default function LogInPage({navigation})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [typeTextSecure, setTypeTextSecure] = useState(true)
    const [displayWrongInformation, setDisplayWrongInformation] = useState(false);

    //Database with usernames and passwords
    const usersAccesInfo = [
        ["Per", "1234"],
        ["Svend", "heyhey"],
        ["Knud", "jegerknud"]
    ]
    
    function logIn()
    {
        console.log("Trying to login: " + username + " | " + password)
        if(isInformationValid("username", username) && isInformationValid("password", password))
        {
            setDisplayWrongInformation(false)
            console.log("Giving acces")
            navigation.navigate("Home") //Set this to homePage     

        } else{
            console.log("Invalid information given")
            setDisplayWrongInformation(true)
        }
    }

    function isInformationValid(type, info) //Type = "username" or "password"    |   info = entered value
    {
        const usernamePosition = 0;
        const passwordPosition = 1;
        const value = type == "username" ? usernamePosition : passwordPosition;

        for(let i = 0; i < usersAccesInfo.length; i++)
        {
            if(usersAccesInfo[i][value] == info)
            {
                return true
            }
        }
        return false
    }

    return(
        <View style={{flex: 1, backgroundColor: "#D0E4FF"}}>
            <BackgroundTopForStartingPage/>

            <View style={{alignItems: "center", }}>
                <Text style={[style.blackFontSize64, {marginTop: "50%"}]}>Dummy List</Text>
                <Text style={[style.blackFontSize25, {marginTop: 34, marginBottom: 62, }]}>Log In</Text>


                <View style={{flexDirection: "column", width: "70%"}}>
                    <View style={{marginBottom: 20}}>
                        <EnterInformationLogInComponent
                            image={require("../assets/icons/userIcon.svg")}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}/>
                    </View>
                    <View style={{}}>
                        <EnterInformationLogInComponent
                            image={require("../assets/icons/lockIcon.svg")}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            imageTwo={require("../assets/icons/cantSeeIcon.svg")}
                            onPressImageTwo={() => setTypeTextSecure(!typeTextSecure)}
                            typePassword={typeTextSecure}/>
                    </View>

                    {displayWrongInformation && (
                        <View style={{position: "absolute", bottom: -25, left: 0}}>
                            <Text style={[style.redFontSize16Regular, {color: "#ff0800"}]}>Invalid username or password, please try again!</Text>
                        </View>
                    )}
                    
                </View>

                <Pressable onPress={logIn} style={[ style.roundedCornersSmall, {marginTop: 30, backgroundColor: "#FFFFFF", width: "30%", height: 45, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: colors.keyColors.secondary}]}>
                    <Text style={[style.blackFontSize20, {}]}>Log In</Text>
                </Pressable>

                <View style={{flexDirection: "row", marginTop: 15}}>
                    <Text style={[style.blackFontSize16, {}]}>Don't have an Account? </Text>
                    <Pressable onPress={() => {console.log("Navigate to sing up page"); navigation.navigate("SignUpPage")}}>
                        <Text style={[style.blackFontSize16, {textDecorationLine: "underline", fontWeight: "bold"}]}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>

            <BackgroundBottomForStartingPage/>
        </View>
    )
}