import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";

import {readData, addToDocument, addToCollection, readSingleUserInformation, } from "../../firebase.js";


export default function CreateChallengePageThree({navigation, route})
{ //TODO. Add task description on creation (Depending on game-mode)
    const { allCurrentChallengeValues } = route.params
    const [ allChallengeValues, setAllChallengeValues] = useState(allCurrentChallengeValues);

    function changeChallengeValues(value, name)
    {
        setAllChallengeValues({
            ...allChallengeValues,
            [name] : value
        });
    }

    async function createFunction()
    {
        async function createChallengePost()
        {
            console.log(allChallengeValues)
            const exactNumberOfTasks = allChallengeValues.gameMode == "Bingo" ? 16 : allChallengeValues.amountOfTasks
            const givenTasks = pickNRandomTasks(allChallengeValues.taskDifficulty, exactNumberOfTasks)

            const tasksWithFriends = givenTasks.map(task => {
                const friendTasks = allChallengeValues.invitedMembers.map(id => ({
                    friendID: id,
                    hasCompletedTask: false
                }));
                return { taskDescription: task, friendsTask: friendTasks };
            });            

            const res = await addToCollection("Challenges", {
                ...allChallengeValues,
                createdBy : global.userInformation?.id || "GuestUser#404",
                isStilActive : true,
                tasks : tasksWithFriends,
                amountOfTasks : exactNumberOfTasks,
            });
            console.log("Following now being added");
            console.log(res);
        }

        // ? Add one to times participated in a challenge (Might want to do it another place, but idk)
        async function addTimesParticipatedToStats()
        {
            try{
                await addToDocument("Users", global.userInformation.id, "Stats", false, false, 1, "TimesParticipated");
            }catch(err){
                console.error(err);
            }
        }

        createChallengePost();
        addTimesParticipatedToStats();


        console.log("Create clicked:");
        console.log(allChallengeValues);
        navigation.navigate("Home");
    }
    
    function previousFunction()
    {
        console.log("Previous clicked:");
        navigation.navigate("CreateChallengePageTwo",{
            allChallengeValues
        })
    }

    const easyTasks = ["Take a 10-minute walk outside", "Do 10 jumping jacks", "Write down 3 things you're grateful for", "Call or text a friend to say hello", "Make your bed", "Do a random act of kindness for someone", "Stretch for 5 minutes", "Clean one small area of your living space", "Listen to your favorite song and dance to it", "Try a new fruit or vegetable", "Take a relaxing bath or shower", "Read a short story or article", "Practice deep breathing for 5 minutes", "Write a positive note to yourself and stick it somewhere you'll see it", "Eat a spoonful of mustard", "Wear mismatched socks for the day", "Talk in an accent for an hour", "Brush your teeth with your non-dominant hand", "Eat a slice of lemon without making a face",];
    const mediumTasks = ["Cook a new recipe from scratch", "Learn a new skill or hobby for 30 minutes", "Complete a 30-minute workout", "Write a letter to a family member or friend", "Organize a cluttered area of your home", "Try a new workout routine", "Go for a bike ride around your neighborhood", "Take a social media break for a day", "Try a new restaurant or café", "Do a digital detox for 2 hours", "Create a vision board for your goals", "Volunteer for a local charity or organization", "Learn a new word in a different language", "Try a new type of exercise class", "Take a day trip to a nearby town or city", "Eat a spoonful of hot sauce", "Wear your clothes backward for a day", "Sing karaoke in public", "Go to a public place and dance like nobody's watching", "Eat a raw clove of garlic",];
    const hardTasks = ["Run a 5k", "Complete a 1-hour yoga session", "Cook a 3-course meal from scratch", "Go hiking for at least 2 hours", "Write a short story or poem", "Create a budget for the month and stick to it", "Learn a new instrument for an hour", "Take a cold shower", "Try a new extreme sport or activity", "Learn to juggle three objects", "Go camping for a weekend", "Do a digital detox for 24 hours", "Complete a 1000-piece puzzle", "Start a DIY project and finish it within a week", "Go on a spontaneous road trip", "Eat a raw egg", "Dance in public for 10 minutes without music", "Give yourself a temporary tattoo with a marker", "Eat a spoonful of wasabi", "Wear socks on your hands for an hour",];

    function pickNRandomTasks(difficulty, amount)
    {
        let taskWithDifficulfty

        const difficultiesAndItsTasks = {
            "low"       : easyTasks,
            "medium"    : mediumTasks,
            "high"      : hardTasks,
        }

        taskWithDifficulfty = difficultiesAndItsTasks[difficulty] || mediumTasks


        let tasksInChallenge = [];
        for(let i = 0; i<amount; i++) //Pick amount random tasks 
        {
            const randomNumberInArray = Math.floor(Math.random() * taskWithDifficulfty.length);
            tasksInChallenge.push(taskWithDifficulfty[randomNumberInArray]);
            taskWithDifficulfty.splice(randomNumberInArray, 1);
        }

        return tasksInChallenge;
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

                {allCurrentChallengeValues.gameMode != "Bingo" ? (
                    <View>
                        <Text style={[style.blackFontSize20, {paddingLeft: 17}]}>Choose Task Difficulty</Text>
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
                    </View>
                ) : (
                    <View style={{marginBottom: 40}}>
                        <Text style={[style.blackFontSize20, {textAlign:"center"}]}>Amount of tasks is set to 16</Text>
                        <Text style={[style.blackFontSize20, {textAlign:"center"}]}>because of chosen GameMode</Text>
                    </View>
                )}

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