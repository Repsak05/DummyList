import React, {useEffect, useState} from "react";
import { View, Image, Text, Pressable } from 'react-native';
import style from "../style";

import { getAllChallenges } from "./GlobalFunctions";
import { readSingleUserInformation } from "../../firebase";

export default function ProfileChallengesOverview({navigation})
{ //TODO: Change thumbnails index depending on chosen value
    //TODO: No need to load all posts here! Find a better solution
    //TODO: Display uploaded images in order of TimePosted?

    const [challengesWithPosts, setChallengesWithPosts] = useState()

    useEffect(() => {
        async function getPostsPerChallenge()
        {
            try{
                //Get all your challenges  --> // ! this is very heavy - add more arguments
                const allYourChallenges = await getAllChallenges(false); //.where global.userInformation.id is in joinedMembers
                console.log(allYourChallenges);

                //Get all your postsID in each challenge
                // [[id1, id2], [id3], [id4], [id5, id6, id6], ...]
                let allYourPostID = []

                allYourChallenges?.map(challenge => {
                    let postIDsPerChallenge = [];

                    for(let friendsTask of challenge.tasks)
                    {
                        for(let member of friendsTask.friendsTask)
                        {
                            if(member.friendID == global.userInformation.id && member.hasCompletedTask && member.postID ){
                                postIDsPerChallenge.push(member.postID)
                            }
                        }
                    }

                    if(postIDsPerChallenge.length){
                        allYourPostID.push(postIDsPerChallenge)
                    }
                })

                //Replace postID's with posts
                let allPost = [];
                for(let perChallenge of allYourPostID)
                {
                    let postPrChallenge = [];

                    for(let postID of perChallenge)
                    {
                        const res = await readSingleUserInformation("Posts", postID);
                        postPrChallenge.push(res);
                    }
                    allPost.push(postPrChallenge);
                }
                setChallengesWithPosts(allPost)

            } catch(err){
                console.error(err)
            }
        }

        getPostsPerChallenge();
    }, [])

    return(
        <View style={[style.roundedCorners, {backgroundColor: "#F8F9FF", flex: 1, width: "90%", alignSelf: "center"}]}>
            <View style={{flexDirection: "column", paddingVertical: 19, paddingHorizontal: 30, overflow: "hidden"}}>
                <Text style={style.blackFontSize25}>Challenges</Text>
                <View style={{marginTop: 1, flexWrap: "wrap", overflow: "scroll", paddingVertical: 21}}>
                    <View style={[style.roundedCornersSmall, {flexDirection: "row", alignItems:"center",}]}>
                        {challengesWithPosts?.map((challenge, index) => (
                            <Pressable key={index} onPress={() => {console.log("Navigate to your posts"); navigation.navigate("CalendarPage", {chosenChallenge : challenge});}}>
                                <Image source={{uri: challenge[0].PostUri}} style={{backgroundColor: "#173578", width: 75, height: 75, marginRight: 5, borderRadius: "50%"}}/>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}