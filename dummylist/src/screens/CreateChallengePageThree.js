import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import style from '../style.js'; 

import Header from "../components/Header.js";
import ProgressBarTemplate from "../components/ProgressBarTemplate.js";
import NextPreviousButton from "../components/NextPreviousButton.js";
import SliderComponent from "../components/SliderComponent.js";
import NumberWheel from "../components/NumberWheel.js";

import { addToCollection } from "../../firebase.js";

export default function CreateChallengePageThree({ navigation, route }) {
    const { allCurrentChallengeValues } = route.params;
    const amountOfPages = allCurrentChallengeValues.gameMode == "Team-Mode" ? 4 : 3;
    const [allChallengeValues, setAllChallengeValues] = useState(allCurrentChallengeValues);
    const [middleNumber, setMiddleNumber] = useState(allCurrentChallengeValues.amountOfTasks || 1); // Initial value

    function changeChallengeValues(value, name) {
        setAllChallengeValues({
            ...allChallengeValues,
            [name]: value
        });
    }

    async function createFunction() {
        async function createChallengePost() {
            const exactNumberOfTasks = allChallengeValues.gameMode == "Bingo" ? 16 : allChallengeValues.amountOfTasks;
            const taskDifficulty = allChallengeValues.taskDifficulty || "medium";
            const givenTasks = pickNRandomTasks(allChallengeValues.taskDifficulty, exactNumberOfTasks);

            const tasksWithFriends = givenTasks.map(task => {
                const friendTasks = allChallengeValues.invitedMembers.map(id => ({
                    friendID: id,
                    hasCompletedTask: false
                }));
                return { taskDescription: task, friendsTask: friendTasks };
            });

            const res = await addToCollection("Challenges", {
                ...allChallengeValues,
                createdBy: global.userInformation?.id || "GuestUser#404",
                isStilActive: true,
                tasks: tasksWithFriends,
                amountOfTasks: exactNumberOfTasks,
                taskDifficulty: taskDifficulty,
            });
        }

        await createChallengePost();

        navigation.navigate("Home");
    }

    function previousFunction() {
        navigation.navigate("CreateChallengePageTwo", {
            allChallengeValues
        });
    }

    const easyTasks = ["Take a 10-minute walk outside", "Do 10 jumping jacks", "Write down 3 things you're grateful for", "Call or text a friend to say hello", "Make your bed", "Do a random act of kindness for someone", "Stretch for 5 minutes", "Clean one small area of your living space", "Listen to your favorite song and dance to it", "Try a new fruit or vegetable", "Take a relaxing bath or shower", "Read a short story or article", "Practice deep breathing for 5 minutes", "Write a positive note to yourself and stick it somewhere you'll see it", "Eat a spoonful of mustard", "Wear mismatched socks for the day", "Talk in an accent for an hour", "Brush your teeth with your non-dominant hand", "Eat a slice of lemon without making a face",];
    const mediumTasks = ["Cook a new recipe from scratch", "Learn a new skill or hobby for 30 minutes", "Complete a 30-minute workout", "Write a letter to a family member or friend", "Organize a cluttered area of your home", "Try a new workout routine", "Go for a bike ride around your neighborhood", "Take a social media break for a day", "Try a new restaurant or café", "Do a digital detox for 2 hours", "Create a vision board for your goals", "Volunteer for a local charity or organization", "Learn a new word in a different language", "Try a new type of exercise class", "Take a day trip to a nearby town or city", "Eat a spoonful of hot sauce", "Wear your clothes backward for a day", "Sing karaoke in public", "Go to a public place and dance like nobody's watching", "Eat a raw clove of garlic",];
    const hardTasks = ["Run a 5k", "Complete a 1-hour yoga session", "Cook a 3-course meal from scratch", "Go hiking for at least 2 hours", "Write a short story or poem", "Create a budget for the month and stick to it", "Learn a new instrument for an hour", "Take a cold shower", "Try a new extreme sport or activity", "Learn to juggle three objects", "Go camping for a weekend", "Do a digital detox for 24 hours", "Complete a 1000-piece puzzle", "Start a DIY project and finish it within a week", "Go on a spontaneous road trip", "Eat a raw egg", "Dance in public for 10 minutes without music", "Give yourself a temporary tattoo with a marker", "Eat a spoonful of wasabi", "Wear socks on your hands for an hour",];

    function pickNRandomTasks(difficulty, amount) {
        const difficultiesAndItsTasks = {
            "low": easyTasks,
            "medium": mediumTasks,
            "high": hardTasks,
        };

        let taskWithDifficulty = difficultiesAndItsTasks[difficulty] || mediumTasks;
        let tasksInChallenge = [];

        for (let i = 0; i < amount; i++) {
            const randomNumberInArray = Math.floor(Math.random() * taskWithDifficulty.length);
            tasksInChallenge.push(taskWithDifficulty[randomNumberInArray]);
            taskWithDifficulty.splice(randomNumberInArray, 1);
        }

        return tasksInChallenge;
    }

    useEffect(() => {
        changeChallengeValues(middleNumber, "amountOfTasks");
    }, [middleNumber]);

    useEffect(() => {
        // Set initial values for endingTime (7-8 days into the future)
        if (allChallengeValues.gameMode == "Long List") {
            let today = new Date();

            if (allChallengeValues?.startingTime) {
                today.setHours(allChallengeValues.startingTime.getHours() + 7 * 24);
            } else {
                today.setHours(today.getHours() + 8 * 24);
            }

            changeChallengeValues(today, "endingTime");
        }
    }, []);

    function updateEndingTime(val) {
        let today = new Date();

        if (allChallengeValues?.startingTime) {
            today.setHours(allChallengeValues.startingTime.getHours() + val * 24);
        } else {
            today.setHours(today.getHours() + (val + 1) * 24);
        }

        changeChallengeValues(today, "endingTime");
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f8f9ff" }}>
            <View style={{ marginTop: 55, marginBottom: 17 }}>
                <Header pageName={"Create Challenge"} navigation={navigation} />
            </View>

            <View style={{ alignSelf: "center", marginBottom: 127 }}>
                <ProgressBarTemplate currentXp={amountOfPages} maxXp={amountOfPages} text={`${amountOfPages}/${amountOfPages}`} setWidth={400} />
            </View>

            {allCurrentChallengeValues.gameMode != "Bingo" ? (
                <View style={{marginBottom: 50}}>
                    <Text style={[style.blackFontSize20, { paddingLeft: 17 }]}>Choose Number of Tasks</Text>
                    <NumberWheel
                        totalNumberOfValues={20}
                        deviderValue={7}
                        onValueChange={(value) => setMiddleNumber(value)}
                    />
                </View>
            ) : (
                <View style={{ marginBottom: 40 }}>
                    <Text style={[style.blackFontSize20, { textAlign: "center" }]}>Amount of tasks is set to 16</Text>
                    <Text style={[style.blackFontSize20, { textAlign: "center" }]}>because of chosen GameMode</Text>
                </View>
            )}

            <View style={{ flexDirection: "column" }}>
                <Text style={[style.blackFontSize20, { paddingLeft: 17 }]}>Choose Task Difficulty</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Pressable style={allChallengeValues.taskDifficulty == "low" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("low", "taskDifficulty")}>
                        <Image source={require("../assets/icons/lowDifficultyIcon.svg")} style={{ width: 100, height: 100 }} />
                    </Pressable>
                    <Pressable style={allChallengeValues.taskDifficulty == "medium" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("medium", "taskDifficulty")}>
                        <Image source={require("../assets/icons/mediumDifficultyIcon.svg")} style={{ width: 100, height: 100 }} />
                    </Pressable>
                    <Pressable style={allChallengeValues.taskDifficulty == "high" || allChallengeValues.taskDifficulty == "" ? style.isPicked : style.isNotPicked} onPress={() => changeChallengeValues("high", "taskDifficulty")}>
                        <Image source={require("../assets/icons/highDifficultyIcon.svg")} style={{ width: 100, height: 100 }} />
                    </Pressable>
                </View>
            </View>

            {allChallengeValues.gameMode == "Long List" && (
                <View>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "600", marginBottom: 10 }}>
                        How long should the challenge be?
                    </Text>
                    <SliderComponent onValueChange={(value) => updateEndingTime(value)} />
                </View>
            )}

            <View style={{paddingHorizontal: 30, justifyContent: "space-between", flexDirection: "row", marginTop: 15}}>
                <NextPreviousButton text={"Previous"} onPress={previousFunction}/>
                <NextPreviousButton text={"Create Challenge"} onPress={createFunction}/>
            </View>
        </View>
    );
}
