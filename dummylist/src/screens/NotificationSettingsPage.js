import React, { useState } from "react";
import { View, Text, Switch } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SettingsSwitch from "../components/SettingsSwitch.js";

export default function NotificationSettingsPage({navigation})
{ //TODO: Update DB

    const [allSettings, setAllSettings] = useState({
        "Challenges" : {
            "Completed Tasks by Friends" : false,    
            "Likes" : false,                         
            "New Challenge Start" : false,           
            "Mention on Friend Task" : true,        
            "Leaderboard Changes" : false,          
        },
        "Friends and Invites" : {
            "New Friend Requests" : true,          
            "Invites To New Challenges" : false,    
            "Reminder To Join Challenges" : false,  
            "Similari Friends" : true,             
        },
        "Other" : {
            "Newsletter" : false,                   
            "New Features" : false,                 
        },
    })
      
    function updateVal(type, name, value) {
        setAllSettings(prevSettings => ({
            ...prevSettings,
            [type]: {
                ...prevSettings[type],
                [name]: value
            }
        }));

        console.log(allSettings)
    }
    
    return (
        <View style={{ flex: 1 }}>
    
            <View style={{ marginTop: 55, marginBottom: 25 }}>
                <Header navigation={navigation} pageName={"Notification"} />
            </View>
    
            <View style={{ alignSelf: "center", width: "90%" }}>
                {Object.entries(allSettings).map(([type, settings], index) => (
                    <View key={index}>
                        <Text style={[style.blackFontSize20, { textAlign: "left", marginTop: 18, marginBottom: 15 }]}>{type}</Text>
                        {Object.entries(settings).map(([name, value], indexTwo) => (
                            <SettingsSwitch
                                key={indexTwo}
                                name={name}
                                value={value}
                                onPress={() => updateVal(type, name, !value)}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}