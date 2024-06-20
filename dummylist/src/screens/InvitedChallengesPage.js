import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView } from 'react-native';
import styles from '../style.js'; 

import Header from "../components/Header.js";
import SwitchButton from "../components/SwitchButton.js";
import CarouselItem from "../components/CarouselItem.js";
import CreateChallengeComponent from "../components/CreateChallengeComponent.js";


import { readDataWithQuery } from "../../firebase.js";
import { differenceInTime } from "../components/GlobalFunctions.js";


export default function InvitedChallengesPage({navigation})
{ //TODO ___something is wrong if you are the guest user
    //TODO: Dont know why scrollview is not working properly

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
       
        navigation.navigate("AcceptChallengeOverviewPage", {chal : challenge})
    }

    //Data taking from db
    const [inChallenges, setInChallenges] = useState([]);

    useEffect(() => {

        async function getAllYourChallenges()
        {
            try{
                const yourchallenges = await readDataWithQuery( "Challenges", 
                        [
                            { field: "startingTime", operator: ">", value: new Date() },
                            { field: "invitedMembers", operator: "array-contains", value: global.userInformation.id }
                        ], 
                        [{ field: "startingTime", direction: "asc" }]
                );

                //Add Wether you are leader in each challenge:
                const finalsSetup = yourchallenges.map(challenge => {
                        const createdByCurrentUser = challenge.createdBy === global.userInformation?.id;

                        return {
                            isOwner : createdByCurrentUser,
                            challenge : challenge,
                        }
                })

                console.log(finalsSetup);
                setInChallenges(finalsSetup);
            }catch(err){
                console.log(err);
            }
        }

        getAllYourChallenges();
    }, [])

    function tHaveYourAccepted(challengeObj)
    {
        for(let members in challengeObj.challenge.joinedMembers)
        {
            const member = challengeObj.challenge.joinedMembers[members];
            if(member == global.userInformation.id){
                return true;
            }
        }
        return false;
    }


    return(
        <ScrollView horizontal={false}>
            <View style={[{width: "100%", marginTop: 55, marginBottom: 20,}]}>
                <Header pageName={"Challenges"} navigation={navigation}/>
            </View>


            <View style={{marginBottom: 17,}}>
                <SwitchButton startingStateIsLeft={false} onPressLeft={handlePressLeft} onPressRight={handlePressRight}/>
            </View>

            <View >
                {inChallenges?.map((challenge, index) => (
                    <View key={index}>
                        {differenceInTime(challenge.challenge.startingTime) > 0 && (
                            <CarouselItem 
                                title={challenge.challenge.challengeName} 
                                extraStylesToBackground={!challenge.isOwner ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : null} //Should be changed
                                extraText={!tHaveYourAccepted(challenge) ? "Not Accepted" : (differenceInTime(challenge.challenge.startingTime)).toFixed(2) + " h  "}
                                onPressFunction={() => challengeInviteClicked(challenge)}
                                hasPlacement={false}
                            />
                        )}
                    </View>
                ))}
            </View>

            {!inChallenges.length && (
                <View style={{alignItems: "center"}}>
                    <View style={{marginTop: 20, width: "80%",}}>
                        <CreateChallengeComponent navigation={navigation} showAmount={false} />
                    </View>
                </View>
            )}

        </ScrollView>
    )
}
