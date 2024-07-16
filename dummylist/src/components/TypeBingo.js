import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, Pressable } from 'react-native';
import style from "../style";


export default function TypeFastestWins({navigation, challenge})
{
    const [rowsOfTasks, setRowsOfTasks] = useState([]);

    useEffect(() => {
        let row = [];
        let board = [];

        for(let task of challenge.tasks)
        {
            row.push(task);

            if(row.length >= 4)
            {
                board.push(row);
                row = [];
            }
        }

        setRowsOfTasks(board);
    }, [])

    function checkIfTaskIsCompleted(task)
    {        
        for(let member of task.friendsTask)
        {
            if(member.friendID == global.userInformation.id && member.hasCompletedTask)
            {
                return true;
            }
        }
        return false;
    }

    function handleImageClick(task)
    {
        if(!checkIfTaskIsCompleted(task))
        {
            console.log("Challenge clicked -> Go to take photo/video!")
            navigation.navigate('CameraPage', { task: task, challengeID : challenge.id, challengeName : challenge.challengeName });
        }else {
            console.log("This task has alredy been done!")
        }
    }

    return (
        <View style={[style.roundedCorners, {borderWidth: 2, borderColor: "#111", padding: 20, marginHorizontal: 20, alignItems: "center", justifyContent: "center"}]}>
            <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                {rowsOfTasks?.map((row, index) => (
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%'}} key={index}>
                        {row.map((task, indexTwo) => (
                            <Pressable onPress={() => {handleImageClick(task);}} style={[style.roundedCornersSmall, {width: 80, height: 80, backgroundColor: checkIfTaskIsCompleted(task) ? "#F2B705" : "#001D34", margin: 4, alignItems: "center", justifyContent: "center"}]} key={indexTwo}>
                                <Text style={[style.whiteFontSize13Reg, {textAlign: "center", numberOfLines: 1, adjustsFontSizeToFit: true, minimumFontScale: 0.5}]}>
                                    {task.taskDescription}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
    
    
    

}