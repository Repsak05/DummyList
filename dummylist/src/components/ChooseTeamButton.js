import React, {useState, useEffect} from "react";
import { View, Text, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import style from '../style.js'; 
import colors from "../colors.js";

export default function ChooseTeamButton({onPress, textTopRight, valueToCheckIfEqualIndex, index, isRandomButton = false })
{
    const teamColors = colors.teamColors;

    return(
        <>
            {!isRandomButton ? (
                <Pressable onPress={onPress} key={index} style={[style.roundedCornersSmall, valueToCheckIfEqualIndex == index+1 ? style.isPicked : style.isNotPicked, { backgroundColor: teamColors[index % teamColors.length][0], padding: 10, margin: 5, width: 100, height: 100, }]}>
                    <Text style={[style.blackFontSize40, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>{index + 1}.</Text>
                    <Text style={[style.blackFontSize16, { textAlign: "center", color: teamColors[index % teamColors.length][1] }]}>Team</Text>
                    <Text style={[style.blackFontSize13, { position: "absolute", top: 3, right: 3 }]}>{textTopRight}</Text>
                </Pressable>

            ) : (
                <Pressable onPress={onPress} style={[style.roundedCornersSmall, valueToCheckIfEqualIndex == false ? style.isPicked : style.isNotPicked, {backgroundColor: "#FFDF9D", padding: 10, margin: 5, width: 100, height: 100}]}>
                    <Image source={require("../assets/icons/randomIcon.svg")} style={{width: 45, heigth: 44, alignSelf: "center", marginTop: 10}}/>
                    <Text style={[style.blackFontSize16, { textAlign: "center",  color: "#251A00", marginTop: 10 }]}>Random</Text>
                </Pressable>
            )}
        </>
    )
}