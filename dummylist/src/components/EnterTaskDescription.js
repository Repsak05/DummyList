import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from 'react-native';
import style from "../style";

export default function EnterTaskDescription()
{
    const [taskDescription, setTaskDescription] = useState("");

    function addTask()
    {
        console.log("Save following to tasks: " + taskDescription)
    }

    return(
        <View style={{borderRadius: 30, backgroundColor: "#FCEAE8", width: "95%", alignSelf: "center"}}>
            <Text style={[style.blackFontSize40, {textAlign: "center", marginTop: 20, marginBottom: 34}]}>Task Description</Text>
            
            <View style={{width: "80%", flexDirection: "column", marginBottom: 72, alignSelf:"center"}}>
                <TextInput
                    style={{width: "100%"}}
                    onChangeText={setTaskDescription}
                    value={taskDescription}
                    placeholder="Enter Challenge Description"
                />
                <View style={{ marginTop: 5, alignSelf: "center", borderBottomColor: "#000000", borderBottomWidth: 3, width: "100%"}} />


                <View style={{flexDirection: "row", position: "absolute", right: 0, top: 50}}>
                    <Pressable onPress={() => {console.log("Cancel this operation")}}style={{borderRadius: 5, backgroundColor: "#FFDAD8", marginRight: 13, paddingHorizontal: 20}}>
                        <Text style={[style.blackFontSize13]}>Cancel</Text>
                    </Pressable>

                    <Pressable onPress={addTask} style={{borderRadius: 5, backgroundColor: "#D3EC9E", paddingHorizontal: 20}}>
                        <Text style={[style.blackFontSize13]}>Accept</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}