import React, { useEffect, useState } from "react";
import { View, Image, Pressable, ImageBackground, Text} from 'react-native';
import style from "../style";

import FeedInformation from "../components/FeedInformation";
import FeedLikedBy from "../components/FeedLikedBy";

import { addToDocument, readSingleUserInformation, removeFromDocumentInArr } from "../../firebase";

export default function UploadedChallengeToFeed({navigation, username, profilePicture, description, postUri, likedBy, postID, challengeID}) //arr looks like this: //[username, profilepic, title, Uri, likedBy]
{    
    const [hasCompleteChallenge, setHasCompletedChallenge] = useState({value : false});
    const [isLiked, setIsLiked] = useState(null);
    const [allLikedBy, setAllLikedBy] = useState(likedBy);
    
    useEffect(() => {
        if(isLiked == null)
        {
            for(let person of allLikedBy){
                if(person == global.userInformation.id){
                    setIsLiked(true);
                    return;
                }
            }
            setIsLiked(false);
        }

       
    }, [])


    useEffect(() => {
         //Determine wether you've finished the task
         if(challengeID) //Problem: Only seems to be running for the first? - look from another acc
         {
             async function getChallenge()
             {
                 try
                 {
                    const res = await readSingleUserInformation("Challenges", challengeID);
 
                    //Find the task which was referenced
                    console.log(res.isStilActive);
                    
                    for(let task of res.tasks)
                    {
                        if(task.taskDescription == description)
                        {
                            for(let friend of task.friendsTask)
                            {
                                //Determine whether you've completed the task
                                if(friend.friendID == global.userInformation.id && friend.hasCompletedTask)
                                {
                                    console.log("Has set true");
                                    setHasCompletedChallenge({value : true});
                                    return;
                                }
                            }

                            console.log(task);
                            if(res.isStilActive)
                            {
                                setHasCompletedChallenge({value: false, task : task});
                            }else {
                                console.log("Challenge Complete - can't complete task | Maybe show it as an icon");
                                setHasCompletedChallenge({value: "Invalid"})
                            }
                            return;
                        }
                    }

                    console.log("No tasks seems to match :(");
 
                 }catch(err){
                     console.log(err);
                 }
             }
 
             getChallenge();
            //  setHasCompletedChallenge(prev => ({...prev, hasGottenValue: true}));
         }else{
            console.log("No challengeID available | From postID: " + postID);
         }

    }, [postID, challengeID, description, allLikedBy])

    useEffect(() => {
        console.log(hasCompleteChallenge);

    }, [hasCompleteChallenge])

    function takePic()
    {
        console.log(`Value: ${hasCompleteChallenge.value} | Task : ${hasCompleteChallenge.task}`);
        console.log(hasCompleteChallenge);
        if(!hasCompleteChallenge.value && hasCompleteChallenge.task)
        {
                navigation.navigate('CameraPage', { task: hasCompleteChallenge.task, challengeID : challengeID })
        }
    }

    async function updateLikedByDB()
    {
        if(!isLiked){
            console.log("Should add user to db")
            await addToDocument("Posts", postID, "LikedBy", global.userInformation.id)
            setIsLiked(true)
        } else {
            console.log("Should remove the user from the db")

            await removeFromDocumentInArr("Posts", postID, "LikedBy", global.userInformation.id)
            setAllLikedBy(getCorrectLiked(likedBy)); //! Need to do something liked this though with usestate()
            setIsLiked(false);

        }
    }

    function getCorrectLiked(arr)
    {
        //If isliked:
        let copy = [];

        for(let id of arr)
        {
            if(id != global.userInformation.id)
            {
                copy.push(id);
            }
        }
        return copy
    }

    return(
        <View>
            <ImageBackground source={{ uri: postUri }} style={[style.roundedCornersExtremeOpposite, { width: 410, height: 727, position: "relative", alignSelf: "center", marginBottom: 15, overflow: 'hidden' }]}>
                <View style={{ position: "absolute", right: 0, top: "40%" }}>
                    <Pressable onPress={() => updateLikedByDB()}>
                        <Image source={isLiked ? require("../assets/icons/isLiked.svg") : require("../assets/icons/notLiked.svg")} />
                    </Pressable>
                    {hasCompleteChallenge.value ? (
                        <>
                            {hasCompleteChallenge.value == "Invalid" ? (
                                <Pressable onPress={() => {console.log("Invalid option")}}>
                                    <Image style={{width: 60, height: 60, backgroundColor: "#444", borderBottomLeftRadius: 15}} source={require("../assets/icons/whiteCross.svg")}/>
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => {console.log("Challenge is alredy complete"); console.log(hasCompleteChallenge)}}>
                                    <Image style={{width: 60, height: 60, backgroundColor: "#F2B705", borderBottomLeftRadius: 15}} source={require("../assets/icons/checkmarkIcon.svg")}/>
                                </Pressable>
                            )}
                        </>
                    ) : (
                        <Pressable onPress={() => {console.log("Navigate to your post / your camera "); takePic();}}>
                            <Image style={{width: 60, height: 60}}source={require("../assets/icons/cameraFeedIcon.svg")} />
                        </Pressable>
                    )}
                </View>
    
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                <View style={{ position: "absolute", bottom: 15, left: 20 }}>
                    <FeedInformation username={username} profileImage={profilePicture} title={description} />
                </View>
            </ImageBackground>
    
            <FeedLikedBy peopleWhoLikedThePost={isLiked ? [global.userInformation?.id, ...getCorrectLiked(allLikedBy)] : allLikedBy} />
        </View>
    )
}