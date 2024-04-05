import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent.js";
import BackgroundTopForStartingPage from "../components/BackgroundTopForStartingPage.js";
import BackgroundBottomForStartingPage from "../components/BackgroundBottomForStartingPage.js";

import {readData, readSingleUserInformation, firestore} from "../../firebase.js";

export default function LogInPage({navigation})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [typeTextSecure, setTypeTextSecure] = useState(true)
    const [displayWrongInformation, setDisplayWrongInformation] = useState(false);

    const [allUsernamePasswordCombinations, setAllUsernamePasswordCombinations] = useState() // [[un1, pw1, id1], [un2, pw2, id2], [un3, pw3, id3]]

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await readData("Users");

                const combinations = data.map(user => [user.Username, user.Password, user.id]);
                setAllUsernamePasswordCombinations(combinations);

            } catch (err) {
                console.log(err);
            }
        } 
    
        fetchUserData();
    }, []);

    useEffect(() => {
        console.log(allUsernamePasswordCombinations)
    }, [allUsernamePasswordCombinations])


    async function logIn()
    {
        console.log("Trying to login: " + username + " | " + password)
        
        try {
            const canLogIn = await isInformationValid(username, password)
            if(canLogIn)
            {
                setDisplayWrongInformation(false)
                console.log("Giving acces")
                navigation.navigate("Home") //Set this to homePage    
            } else{
                console.log("Invalid information given")
                setDisplayWrongInformation(true)
            }
        } catch(err){
            console.error(err)
        }
    }

    async function isInformationValid(username, password) //Type = "username" or "password"    |   info = entered value
    {
        for(let i = 0; i<allUsernamePasswordCombinations.length; i++)
        {
            if(allUsernamePasswordCombinations[i][0] == username && allUsernamePasswordCombinations[i][1] == password && allUsernamePasswordCombinations[i][0] && allUsernamePasswordCombinations[i][1])
            {
                global.loggedInID = allUsernamePasswordCombinations[i][2];
                global.userInformation = await readSingleUserInformation("Users", global.loggedInID)
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