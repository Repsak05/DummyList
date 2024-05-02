import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import CarouselItem from "../components/CarouselItem.js";

import { readData } from "../../firebase.js";
import { differenceInTime } from "../components/GlobalFunctions.js";


export default function InvitedChallengesPage({navigation})
{ //TODO ___something is wrong if you are the guest user
    //TODO ___Only show if challenge is not active (But is going to be)
    //TODO: Dont know why scrollview is not working properly
    //DB; Sort challenges by startingTime > currentTime

    function handlePressLeft()
    {
        console.log("Left has been pressed!");
        navigation.navigate("FriendsPage")
    }
    
    function handlePressRight()
    {
        console.log("Right has been pressed!");
        //Navigate to challenges requests
    }

    function challengeInviteClicked(challenge)
    {
        console.log("Navigate to invited challenge", )
        console.table(challenge)
       
        navigation.navigate("AcceptChallengeOverviewPage", {challenge})
    }

    //Data taking from db
    const [inChallenges, setInChallenges] = useState()
    
    useEffect(() => {
        async function getAllChallenges() 
        {
            try {
                const res = await readData("Challenges");
                const usersInChallenge = res.map(challenge => {
                    if (challenge) 
                    {
                        //Check wether user is invted or has created the challenge (Or not apart of challenge)
                        const createdByCurrentUser = challenge.createdBy === global.userInformation?.id;
                        const invitedToChallenge = challenge.friends && challenge.friends.some(friend => friend.user === global.userInformation?.id);
    
                        if (createdByCurrentUser || invitedToChallenge) 
                        {    
                            return {
                                isOwner : createdByCurrentUser,
                                challenge : challenge,
                            }
                        }
                    }
    
                    return null;
                });
    
                // Remove null entries from the array
                const filteredUsersInChallenge = usersInChallenge.filter(userInChallenge => userInChallenge !== null);
                setInChallenges(filteredUsersInChallenge)
                console.log(filteredUsersInChallenge)


                for (let challenge of filteredUsersInChallenge) {
                    const firestoreTimestamp = challenge.challenge.startingTime;
                    console.log(differenceInTime(firestoreTimestamp));
                }
            } catch (err) {
                console.error(err);
            }
        }
    
        getAllChallenges();

    }, []);



    function haveYouAccepted(challengeObj)
    {
        for(let members in challengeObj.challenge.friends)
        {
            let mem = challengeObj.challenge.friends[members];
            if(mem.user == global.userInformation.id && mem.hasJoined){
                return true
            }
        }
        return false
    }


    return(
        <View>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 20,}]}>
                <Header pageName={"Challenges"} navigation={navigation}/>
            </View>


            <View style={{marginBottom: 17,}}>
                <SwitchButton startingStateIsLeft={false} onPressLeft={handlePressLeft} onPressRight={handlePressRight}/>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {inChallenges?.map((challenge, index) => (
                    <View key={index}>
                        {differenceInTime(challenge.challenge.startingTime) > 0 && (
                            <CarouselItem 
                                title={challenge.challenge.challengeName} 
                                extraStylesToBackground={!challenge.isOwner ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : null} //Should be changed
                                extraText={!haveYouAccepted(challenge) ? "Not Accepted" : "Starts in " + (differenceInTime(challenge.challenge.startingTime)).toFixed(2) + "h "}
                                onPressFunction={() => challengeInviteClicked(challenge)}
                                hasPlacement={false}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>

        </View>
    )

}
