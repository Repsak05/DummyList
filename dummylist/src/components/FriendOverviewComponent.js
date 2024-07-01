import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 
import { readSingleUserInformation } from "../../firebase.js";

export default function FriendOverviewComponent({id, name, image, level})
{
    //Create function that gets all props from id
    const [theName, setTheName] = useState(name || "loading...")
    const [theLevel, setTheLevel] = useState(level || 404)
    const [theImage, setTheImage] = useState(image || null)

    useEffect(() => {
        async function getData()
        {
            if(id){
                try{
                    const res = await readSingleUserInformation("Users", id)

                    if(theName == "loading..."){
                        setTheName(name || res.Username || "Invalid");
                    }
                    if(theLevel == 404){
                        setTheLevel(level || res.Level || 1337);
                    }
                    if(!theImage){
                        const exampleImage = "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"
                        setTheImage(res.ProfilePicture ? {uri: res.ProfilePicture} : {uri : exampleImage});
                    }

                }catch(err){
                    console.error(err)
                }
            }
        }
        getData();
    }, [id])


    return(
        <View style={[style.roundedCorners, {backgroundColor: "#FFDAD2", width: 184, height: 167, padding: 9, flexDirection: "column"}]}>
            {theImage && (
                <Image source={theImage} style={[style.roundedCorners, {width: 166, height: 117}]}/>
            )}
            <View style={{flexDirection: "row", marginTop: 8, justifyContent: "space-between"}}>
                <Text style={style.redFontSize16}>@{theName}</Text>
                <Text style={style.redFontSize16Regular}>Level {theLevel}</Text>
            </View>
        </View>
    )

}