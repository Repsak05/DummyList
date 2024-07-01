import React, { useEffect, useState } from "react";
import { View, Text, Switch } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import SettingsSwitch from "../components/SettingsSwitch.js";
import { createOrUpdateDocument, readSingleUserInformation } from "../../firebase.js";

export default function NotificationSettingsPage({navigation})
{ //TODO: Update DB
    const [allSettings, setAllSettings] = useState(null)
    const initialSettings = {
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
    }

    useEffect(() => {
        async function getInitialValues()
        {
            try{
                const res = await readSingleUserInformation("Settings", global.userInformation.id);

                if(res.notifications){
                    setAllSettings(res.notifications);
                } else {
                    setAllSettings(initialSettings);
                }
    
            }catch(err){
                console.log(err);
                setAllSettings(initialSettings);
            }
        }

        getInitialValues();
    }, [])

    useEffect(() => {
        async function updateNotificationsValues()
        {
            try{
                await createOrUpdateDocument("Settings", global.userInformation.id, {"notifications" : allSettings});
            }catch(err){
                console.log(err);
            }
        }

        updateNotificationsValues();
    }, [allSettings])

      
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

    if (allSettings === null) {
        return <Text>Loading...</Text>; // Render loading state while data is being fetched
    }
    
    return (
        <View style={{ flex: 1 }}>
    
            <View style={{ marginTop: 55, marginBottom: 25 }}>
                <Header navigation={navigation} pageName={"Notification"} navigateToPage={"SettingsPage"} />
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
