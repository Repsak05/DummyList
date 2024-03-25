import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/progressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";

export default function CreateChallengePageThree({navigation, route})
{
    const { allCurrentChallengeValues } = route.params
    const [ allChallengeValues, setAllChallengeValues] = useState(allCurrentChallengeValues);

    function changeChallengeValues(value, name)
    {
        setAllChallengeValues({
            ...allChallengeValues,
            [name] : value
        })
    }

    function createFunction()
    {
        console.log("Create clicked:");
        console.log(allChallengeValues);
    }
    
    function previousFunction()
    {
        console.log("Previous clicked:");
        navigation.navigate("CreateChallengePageTwo",{
            allChallengeValues
        })
    }

    //All values that can be scrolled through:
    const options = []
    const totalNumberOfValues = 20
    const deviderValue = 7
    for(let i = 0; i < Math.ceil(totalNumberOfValues/deviderValue); i++)
    {
        options.push("ㅤ")
    }
    for(let i = 1; i <= totalNumberOfValues; i++)
    {
        options.push(i)
    }
    for(let i = 0; i < Math.ceil(totalNumberOfValues/deviderValue); i++)
    {
        options.push("ㅤ")
    }
    


    const [middleNumber, setMiddleNumber] = useState(null);
    const [prevMiddleNumber, setPrevMiddleNumber] = useState(null);
    const scrollViewRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(null);
    const [contentWidth, setContentWidth] = useState(null);

    useEffect(() => {
        changeChallengeValues(middleNumber, "amountOfTasks")
    },[middleNumber])


    useEffect(() => {
        // Measure the width of the container
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((fx, fy, width, height, px, py) => {
                setContainerWidth(width);
            });
        }
    }, []);

    useEffect(() => {
        if (containerWidth && contentWidth) {
            const initialScrollX = (contentWidth - containerWidth) / 2;
            scrollViewRef.current.scrollTo({ x: initialScrollX, animated: false });
            const initialMiddleIndex = Math.round(initialScrollX / (containerWidth / options.length));
            const initialMiddleVal = options[initialMiddleIndex];
            setMiddleNumber(initialMiddleVal);
            setPrevMiddleNumber(initialMiddleVal);
        }
    }, [containerWidth, contentWidth]);

    function onContentSizeChange(width, height)
    {
        setContentWidth(width);
    };

    function calculateMiddleNumber(event)
    {
        const screenWidth = Dimensions.get("window").width;
        const scrollOffsetX = event.nativeEvent.contentOffset.x;
        const scrollViewCenter = scrollOffsetX + screenWidth / 2;
        const middleIndex = Math.round(scrollViewCenter / (contentWidth / options.length));
        const middleVal = options[middleIndex];
        if (Number.isInteger(middleVal)) {
            setMiddleNumber(middleVal);
            setPrevMiddleNumber(middleVal);
        } else {
            setMiddleNumber(prevMiddleNumber);
        }
    };

    return(
        <View>
            <View style={{marginTop: 55, marginBottom: 17}}>
                <Header pageName={"Create Challenge"} navigation={navigation}/>
            </View>

            <View style={{alignSelf: "center", marginBottom: 127}}>
                <ProgressBarTemplate currentXp={3} maxXp={3} text={"3/3"} setWidth={400}/>
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                style={{ marginBottom: 50, }}
                onScroll={calculateMiddleNumber}
                scrollEventThrottle={16}
                onContentSizeChange={onContentSizeChange}
            >
                <View style={{ flexDirection: "row", marginBottom: 20}}>
                    {options.map((val, index) => (
                        <TouchableOpacity key={index} style={{ paddingHorizontal: 15 }}>
                            <Text style={[style.blackFontSize64, val === middleNumber ? styles.highlightedText : null]}>{val}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={{flexDirection: "column"}}>
                <Text style={[style.blackFontSize20, {paddingLeft: 17}]}>Choose Task Difficulty</Text>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <Pressable style={allChallengeValues.taskDifficulty == "low" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("low", "taskDifficulty")}>
                        <Image source={require("../assets/icons/lowDifficultyIcon.svg")} style={{width: 100, height: 100}}/>
                    </Pressable>
                    <Pressable style={allChallengeValues.taskDifficulty == "medium" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("medium", "taskDifficulty")}>
                        <Image source={require("../assets/icons/mediumDifficultyIcon.svg")} style={{width: 100, height: 100}}/>
                    </Pressable>
                    <Pressable style={allChallengeValues.taskDifficulty == "high" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("high", "taskDifficulty")}>
                        <Image source={require("../assets/icons/highDifficultyIcon.svg")} style={{width: 100, height: 100}}/>
                    </Pressable>
                </View>
            </View>

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                <NextPreviousButton text={"Create Challenge"} onPress={createFunction}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    highlightedText: {
        backgroundColor: 'green',
    },
});