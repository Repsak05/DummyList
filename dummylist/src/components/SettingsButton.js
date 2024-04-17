import React, { useState } from "react";
import { View, Text, Switch, Pressable } from 'react-native';
import style from "../style";

export default function SettingsButton({name, onPress, isPressed = false})
{

    return (
        <View style={{ flexDirection: "column", alignContent: "center", width: "100%", marginBottom: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
           <Text style={[style.greyFontSize20Reg, { marginLeft: 24 }]}>{name || "Completed Friends"}</Text>
           
           <Pressable onPress={onPress} style={{ width: 58, height: 30, marginRight: 10 }}>
                <View style={{width: 30, height: 30, borderRadius: "50%", borderWidth: 3, borderColor: "#000000", justifyContent: "center", alignItems: "center"}}>
                    {isPressed && (
                        <View style={{width: 20, height: 20, borderRadius: "50%", backgroundColor: "#000000"}}></View>
                    )}
                </View>
           </Pressable>
       </View>

       <View style={{ marginTop: 5, borderBottomColor: "#000000", borderBottomWidth: 3, width: "100%" }} />
   </View>
    )

}