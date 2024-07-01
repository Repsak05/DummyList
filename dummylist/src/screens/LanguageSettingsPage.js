import React, { useState, useEffect } from "react";
import { View, Text, Switch, Pressable } from 'react-native';
import style from "../style";

import SettingsButton from "../components/SettingsButton";
import Header from "../components/Header";
import { createOrUpdateDocument, readSingleUserInformation } from "../../firebase";

export default function LanguageSettingsPage({navigation})
{
    let [chosenLanguage, setChosenLanguage] = useState("English"); //Initial value == "English"
    const allPossibleLanguages = ["English", "Dansk", "Español", "Deutsch", "Français", "Svenska", "Norsk", "Nederlands"];
    
    const [languages, setLanguages] = useState(convertToObject());
    
    useEffect(() => {
        //Gettings values from DB
        async function getInitialValues()
        {
            try{
                const res = await readSingleUserInformation("Settings", global.userInformation.id);
                if(res.language){
                    setChosenLanguage(res.language);
                } 
    
            }catch(err){
                console.log(err)
            }
        }

        getInitialValues();
    }, [])


    useEffect(() => {
        setLanguages(convertToObject());

        //Update DB on change
        async function updateDB()
        {
            try{
                await createOrUpdateDocument("Settings", global.userInformation.id, {language : chosenLanguage});

            }catch(err){
                console.log(err);
            }
        }

        updateDB();

    }, [chosenLanguage])
    
    function convertToObject()
    {
        const obj = {};
        for(let language of allPossibleLanguages)
        {
            obj[language] = language == chosenLanguage;
        }

        return obj;
    }
    
    return(
        <View style={{ flex: 1 }}>
    
            <View style={{ marginTop: 55, marginBottom: 25 }}>
                <Header navigation={navigation} pageName={"Languages"} navigateToPage={"SettingsPage"}/>
            </View>


            <View style={{ alignSelf: "center", width: "90%" }}>
            <Text style={[style.blackFontSize20, { textAlign: "left", marginTop: 18, marginBottom: 15, }]}>Languages</Text>
                {Object.entries(languages).map(([language, value], index) => (
                    <View key={index}>
                        <SettingsButton name={language} isPressed={value} onPress={() => setChosenLanguage(language)} />
                    </View>
                ))}
            </View>

        </View>
    )
}
