import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

import {readData, readSingleUserInformation, firestore, firebaseAuth} from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogInPage({navigation})
{
    const [loading, setLoading] = useState(false); //Maybe add a loading image, when set to true
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [typeTextSecure, setTypeTextSecure] = useState(true)
    const [displayWrongInformation, setDisplayWrongInformation] = useState(false);
    const auth = firebaseAuth;
    
    async function signIn()
    {
        setLoading(true);
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log(res)
            console.log("Account created")
            setDisplayWrongInformation(false)
            console.log("Giving acces")
            navigation.navigate("ProfilePage")
        }catch(err){
            console.error(err)
            setDisplayWrongInformation(true)
            console.log("Reg failed. Invalid arguments...")
        }finally{
            setLoading(false);
        }
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
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}/>
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
                            <Text style={[style.redFontSize16Regular, {color: "#ff0800"}]}>Invalid email or password, please try again!</Text>
                        </View>
                    )}
                </View>
                   
                <Pressable onPress={() => {signIn();}} style={[ style.roundedCornersSmall, {marginTop: 30, backgroundColor: "#FFFFFF", width: "30%", height: 45, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: colors.keyColors.secondary}]}>
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