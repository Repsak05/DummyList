import React, {useState} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";

export default function LogInPage({navigation})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [typeTextSecure, setTypeTextSecure] = useState(true)

    function logIn()
    {
        //Check for the username and password in database
        console.log("Trying to login: " + username + " | " + password)
        navigation.navigate("Home") //Set this to homePage
    
    }
    return(
        <View style={{flex: 1, alignItems: "center", backgroundColor: "#D0E4FF"}}>
            <Text style={[style.blackFontSize64, {marginTop: 50}]}>Dummy List</Text>
            <Text style={[style.blackFontSize25, {marginTop: 34, marginBottom: 62, }]}>Log In</Text>


            <View style={{flexDirection: "column"}}>
                <View style={{marginBottom: 20}}>
                    <EnterInformationLogInComponent
                        image={require("../assets/icons/userIcon.svg")}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}/>
                </View>
                <View style={{}}>
                    <EnterInformationLogInComponent
                        image={require("../assets/icons/userIcon.svg")}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        imageTwo={require("../assets/icons/cantSeeIcon.svg")}
                        onPressImageTwo={() => setTypeTextSecure(!typeTextSecure)}
                        typePassword={typeTextSecure}/>
                </View>
            </View>

            <Pressable onPress={logIn} style={[ style.roundedCorners, {marginTop: 52, backgroundColor: "#3A8453", width: "80%", height: 55, alignItems: "center", justifyContent: "center"}]}>
                <Text style={[style.blackFontSize25, {color: "#FFFFFF"}]}> Log In</Text>
            </Pressable>

            <View style={{flexDirection: "row", marginTop: 10}}>
                <Text style={[style.blackFontSize16, {}]}>Don't have an Account? </Text>
                <Pressable onPress={() => {console.log("Navigate to sing up page"); }}>
                    <Text style={[style.blackFontSize16, {textDecorationLine: "underline", fontWeight: "bold"}]}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    )
}