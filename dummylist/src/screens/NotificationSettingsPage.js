import React from "react";
import { View } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SettingsSwitch from "../components/SettingsSwitch.js";

export default function NotificationSettingsPage() {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ marginTop: 55, marginBottom: 25 }}>
                <Header navigation={navigation} pageName={"Feed"} />
            </View>


            <View style={{ alignSelf:"center", width: "90%" }}>
                <SettingsSwitch name="Completed Friends" onPress={() => {console.log("S1")}} />
                <SettingsSwitch name="Some Other Setting" onPress={() => {console.log("S2")}} />
                <SettingsSwitch name="Another Setting" onPress={() => {console.log("S3")}} />
            </View>
        </View>
    );
}
