import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default function Challenge() {
    const [randomString, setRandomString] = useState("This is a random string");
    const [allPlayers, setAllPlayers] = useState([]);
    

    class User{
        constructor(name){
            this.name = name;

            this.allChallenges = [];
            this.friends = []
            setAllPlayers(previous => [...previous, this]);
        }

        addFriend(friendObject){
            this.friends.push(friendObject)
            friendObject.friends.push(this)
        }

        createChallenge(groupName, members, frontPageImage){
            this.allChallenges.push(new Challenges(groupName, members, frontPageImage));
        }

        addMemberToChallenge(challenge, newMember){
            challenge.members.push(newMember);
            newMember.allChallenges.push(challenge);
        }

        completedTask(challenge, taskDescription){
            for(let tasks of challenge){
                if(tasks.description == taskDescription){
                    tasks.membersCompletedTask.push(this) //____Might need to use this.name
                }
            }
        }
    }



    class Challenges {
        constructor(groupName, members, frontPageImage) {
            this.groupName = groupName;
            this.tasks = [new Tasks("Eat A Raw Egg", []), new Tasks("Play Sport for 20 min", []), new Tasks("Eat A Raw Onion", []), new Tasks("Cut 10 cm of your Hair", []), new Tasks("Don't wear Socks for a Day",[])];
            this.members = members;
            this.frontPageImage = frontPageImage;
        }

        displayChallenges(){
            <View>
                displayChallenges
            </View>
        }

        displayLeaderboard(){
            <View>
                displayLeaderboard
            </View>
        }
    }



    class Tasks {
        constructor(description, membersCompletedTask) {
            this.description = description;
            this.membersCompletedTask = membersCompletedTask;
        }

        displayTasks(){
            <View>
                displayTasks
            </View>
        }
    }


    const [username, setUsername] = React.useState('');
    const [showLoginPage, setShowLoginPage] = useState(true);
    const [yourCharacter, setYourCharacter] = useState();

    //New for each challenge
    const [playersInChallenge, setPlayersInChallenge] = useState([]);
    const [challengeName, setChallengeName] = useState("");
    const [showOverview, setShowOverview] = useState(false);
    const [showTasks, setShowTasks] = useState(false);

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });
    

    function onSubmitEdit(parameter) {
        console.log(`${username} submitted! ${parameter}`)
        const newUser = new User(username);
        setYourCharacter(newUser);
        setShowLoginPage(false);
    }


    useEffect(() => {
        //Creating other users and making some friends
        if (yourCharacter) {

            new User("Poul");
            let bent = new User("Bent");
            let erik = new User("Erik");
            yourCharacter.addFriend(bent);
            erik.addFriend(yourCharacter);
        }
    }, [yourCharacter]);
    

    function createChallenge() {
        yourCharacter.createChallenge(challengeName, [...playersInChallenge, yourCharacter], "www.google.com/images/first");
        console.log(yourCharacter);
        setPlayersInChallenge([]);
    }
    

    function addPlayerToChallenge(player){
        setPlayersInChallenge(prev => [...prev, player]);
        console.log(playersInChallenge);
    }

    function enableShowOverview(){
        setShowOverview(true);
        setShowLoginPage(false); // Hide login page
        setShowTasks(false);     // Hide tasks
    }
    

    return (
        <View>
            {showLoginPage && (
                <>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Enter username..."
                    />

                    <Button
                        title="Submit"
                        onPress={() => onSubmitEdit(12)}
                    />
                </>
            )}
    
            {!showLoginPage && !showOverview && (
                <>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={challengeName}
                            onChangeText={(text) => setChallengeName(text)}
                            placeholder="Enter Group Name..."
                        />

                        <Button
                            title="Create new challenge"
                            onPress={createChallenge}
                        />
                    </View>
                    
                    {yourCharacter.friends.map(player => (
                        <View key={player.name}>
                            <Text>{player.name}</Text>

                            <Button
                                title="Add player to challenge"
                                onPress={() => addPlayerToChallenge(player)}
                            />
                        </View>
                    ))}

                    <View>
                        <Button
                                title="SHOW OVERVIEW OF CHALLENGES"
                                onPress={enableShowOverview}
                            />
                    </View>
                </>
            )}

            {!showLoginPage && showOverview &&(
                <>
                    <View>
                        <Text> Overview over all Challenges</Text>


                    </View>
                    {yourCharacter.allChallenges.map((activeChallenge) => (
                        <View key={activeChallenge.groupName}>
                            <Text> {activeChallenge.groupName}</Text>
                            
                            {activeChallenge.members.map((joinedMembers) => (
                                <View key={joinedMembers.name}>
                                    <Text> {joinedMembers.name}</Text>
                                </View>
                            ))}

                        </View>)
                    )}
                </>
            )}
            
        </View>
    );
    
}
