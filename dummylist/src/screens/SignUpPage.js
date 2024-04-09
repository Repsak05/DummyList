import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

import {readData, addToCollection, readSingleUserInformation, firebaseAuth, firestore} from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage({navigation})
{
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [typeTextSecure, setTypeTextSecure] = useState(true)
    const [currentState, setCurrentState] = useState(1);
    
    const [displayUsernameAlredyInUse, setDisplayUsernameAlredyInUse] = useState(false)
    const [displayNotAllInformationEntered, setDisplayNotAllInformationEntered] = useState(false)
    const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState(false);
    
    const [currentUsernames, setCurrentUsernames] = useState()


    const auth = firebaseAuth;
    const [loading, setLoading] = useState(false);
    async function signUp() {
        setLoading(true);
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully:", res);
            
            const uid = res.user.uid;
            await addToCollection("Users", {
                Email: email,
                Level: 1,
                Username: username,
                uid: uid 
            });

            console.log("Account created successfully");
            setInvalidEmailOrPassword(false);
        } catch(err) {
            console.error("Error signing up:", err);
            setInvalidEmailOrPassword(true);

            //remove used email from db? (Since account wasnt set up correctly)
        } finally {
            setLoading(false);
        }
    }
    
    

    useEffect(() => { //get all used Usernames
        async function fetchUserData() {
            try {
                const data = await readData("Users");

                const combinations = data.map(user => user.Username);
                setCurrentUsernames(combinations);
                console.log(currentUsernames)

            } catch (err) {
                console.log(err);
            }
        } 
    
        fetchUserData();
    }, []);

    function isUsernameInUse(enteredUsername) //Ensure different usernames
    {
        for (let i = 0; i<currentUsernames.length; i++)
        {
            if(currentUsernames[i].toLowerCase() == enteredUsername.toLowerCase() && currentUsernames) return true;
        }
        return false;
    }

    function goToNextPage()
    {
        console.log(`Username: ${username} | Email: ${email} | Password: ${password}`);
        
        //___Ensures that username all entered information is valid
        if(currentState == 1 && isUsernameInUse(username))
        {
            console.log("Username alredy taken");
            setDisplayUsernameAlredyInUse(true);
            return;
        }  
        
        if (currentState == 3 && username && email && password) {
            return
        }

        setCurrentState(currentState + 1);
        setDisplayUsernameAlredyInUse(false);
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
                            <Pressable onPress={() => {goBack(); setDisplayNotAllInformationEntered(false);}} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.secondary, paddingHorizontal: 20, paddingVertical: 5}}>
                                <Text style={[style.blackFontSize13, {}]}>Back</Text>
                            </Pressable>
                            {displayUsernameAlredyInUse && (
                                <Text style={[style.redFontSize16, {color: "#ff0800"}]}>Username alredy in use</Text>
                                )}
                            {displayNotAllInformationEntered && (
                                <Text style={[style.redFontSize16, {color: "#ff0800"}]}>Enter required values</Text>
                            )}
                            {invalidEmailOrPassword && (
                                <Text style={[style.redFontSize16, {color: "#ff0800"}]}>Email/Password unusable</Text>
                            )}
                            {currentState == 3 
                             ? (
                                <>
                                    {loading 
                                        ? (<ActivityIndicator size={"large"} color={"0000ff"}/>)
                                        :(
                                            <Pressable onPress={() => {signUp();}} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.primary, paddingHorizontal: 20, paddingVertical: 5}}>
                                                <Text style={[style.blackFontSize13, {}]}>Create</Text>
                                            </Pressable>
                                    )}
                                </>
                             )
                             : (
                                <Pressable onPress={() => {goToNextPage();}} style={{justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: colors.keyColors.primary, paddingHorizontal: 20, paddingVertical: 5}}>
                                    <Text style={[style.blackFontSize13, {}]}>Next</Text>
                                </Pressable>
                             )
                            }
                        </View>
                    </View>
                </View>
            </View>
            
            <BackgroundBottomForStartingPage/>
        </View>
    )
}