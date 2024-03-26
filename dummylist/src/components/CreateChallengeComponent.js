import React from "react";
import { View, Text, Image, Pressable   } from 'react-native';
import style from '../style.js'; 

export default function CreateChallengeComponent({navigation})
{
    function openCreateChallenge()
    {
        console.log("Create challenge clicked!")
        navigation.navigate("CreateChallengePageOne")
    }

    return(
        <View>
            <Pressable onPress={openCreateChallenge} style={[style.wrapper, style.roundedCornersOpposite, {borderWidth: 10, borderColor: "#767B82", backgroundColor: "#42474E", height: 204, justifyContent: "center", position: "relative", marginBottom: 12}]}>
                <Image source={require('../assets/icons/bigPlus.svg')} style={{width: 124, height: 124}} />
                <View style={[{position: "absolute", bottom: 0, left: 0, backgroundColor: "#767B82", borderTopRightRadius: 30, paddingHorizontal: 6, paddingVertical: 10}]}>
                    <Text style={style.whiteFontSize25}> Create Challenge </Text>
                </View>
            </Pressable> 
            <Image style={{alignSelf: "center"}} source={require("../assets/icons/placedMostLeft.svg")}/>
        </View>
    )

}