import React, { useState, useEffect } from "react";
import { View, Text, Switch, Pressable } from 'react-native';
import style from "../style";

import SettingsButton from "../components/SettingsButton";
import Header from "../components/Header";

export default function LanguageSettingsPage({navigation})
{ //TODO: Load and set values from and to db
    const [languages, setLanguages] = useState({
        "English" : true,
        "Dansk" : false,
        "Español" : false,
        "Deutsch" : false,
        "Français" : false,
        "Svenska" : false,
        "Norsk" : false,
        "Nederlands" : false,
    })

    function changeLanguage(newLanguage) 
    {
        let valueChanged = false;
    
        const updatedLanguages = { ...languages };
    
        for (let language in updatedLanguages) {
            if (updatedLanguages[language] === true) {
                updatedLanguages[language] = false; 
            }
    
            if (language === newLanguage) {
                updatedLanguages[language] = true; 
                valueChanged = true;
            }
        }
    
        if (valueChanged) {
            setLanguages(updatedLanguages)
        }
    }
    
    return(
        <View style={{ flex: 1 }}>
    
            <View style={{ marginTop: 55, marginBottom: 25 }}>
                <Header navigation={navigation} pageName={"Languages"} />
            </View>


            <View style={{ alignSelf: "center", width: "90%" }}>
            <Text style={[style.blackFontSize20, { textAlign: "left", marginTop: 18, marginBottom: 15, }]}>Languages</Text>
                {Object.entries(languages).map(([language, value], index) => (
                    <View key={index}>
                        <SettingsButton name={language} isPressed={value} onPress={() => changeLanguage(language)} />
                    </View>
                ))}
            </View>

        </View>
    )
}
