import React, { useRef, useEffect, useState } from "react";
import { View, Image, Text, Pressable, ImageBackground } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import EnterInformationLogInComponent from "../components/EnterInformationLogInComponent";
import { defaultEmail, defaultImage, defaultName } from "../defaultValues";
import { firebaseAuth } from "../../firebase";

export default function AccountSettingsPage({navigation})
{ //TODO: Missing functionality: username and password can't currently be changed on demand 
    //Handle change in information (update database)
        //Ensure new username it not being used

    const [username, setUsername] = useState(global.userInformation?.Username || defaultName);
    const [email, setEmail] = useState(global.userInformation?.Email || defaultEmail);

    function editProfileImage()
    {
        console.log("Edit profile image");
        navigation.navigate("ChangeProfilePicture");
    }
    return(
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
            <View style={{marginTop: 55, marginBottom: 40}}>
                <Header navigation={navigation} pageName={"Account Settings"} navigateToPage={"SettingsPage"}/>
            </View>

            <ImageBackground style={{ width: "100%", height: 341}} source={global.userInformation.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : {uri: defaultImage}}>
                <Pressable onPress={() => editProfileImage()} style={{position: "absolute", bottom: 20, right: 20, width: 45, height: 45, borderRadius: "50%", backgroundColor: "#0477BF", alignItems: "center", justifyContent: "center"}}>
                    <Image style={{width:24, height: 24, }} source={require("../assets/icons/editIcon.svg")}/>
                </Pressable>
            </ImageBackground>

            <View style={{width: "80%", alignSelf: "center", marginTop: 68}}>
                <EnterInformationLogInComponent image={require("../assets/icons/userIcon.svg")} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <View style={{marginVertical: 24}}>
                    <EnterInformationLogInComponent image={require("../assets/icons/emailIcon.svg")} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </View>
                <EnterInformationLogInComponent image={require("../assets/icons/passwordIcon.svg")} placeholder='Password - Not working yet' typePassword={true}/>
            </View>

            <View style={{marginTop: 34, justifyContent: "space-around", flexDirection: "row", marginHorizontal: 10}}>
                <Pressable onPress={() => {navigation.navigate("LogInPage"); firebaseAuth.signOut(); }} style={[style.roundedCornersSmall, {borderWidth: 5, borderColor: "#BA1A1A", width: "40%", alignItems: "center", justifyContent: "center"}]}>
                    <Text style={[style.blackFontSize20]}>Sign Out</Text>
                </Pressable>
                <Pressable onPress={() => console.log("Delete Account")} style={[style.roundedCornersSmall, {backgroundColor: "#BA1A1A", width: "40%", alignItems: "center", justifyContent: "center"}]}>
                    <Text style={[style.blackFontSize20, {color: "#FFF"}]}>Delete Account</Text>
                </Pressable>
            </View>

        </View>
    )
}