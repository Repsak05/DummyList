import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import UploadedChallengeToFeed from "../components/UploadedChallengeToFeed";

import { readData, readSingleUserInformation, readDocumentsInArray } from "../../firebase";
import {getAllChallenges} from "../components/GlobalFunctions"
import { defaultImage } from "../defaultValues";

export default function FeedPage({ navigation }) 
{   //TODO: Replace Loading... with correct loading screen
    //! Only load a few posts at a time - load more on scroll

    //Change this to the user's profilepicture in users db
    const exampleURI = "https://as1.ftcdn.net/v2/jpg/05/68/23/98/1000_F_568239815_8NB11CB6LT2D3lBhDVa10jQ6qMYJKCzh.jpg"
       
    const [allPostsYourShouldSee, setAllPostsYourShouldSee] = useState();

    useEffect(() => {
        async function fetchData()
        {
            try {
                let allID = await getAllChallenges(); //Gets all postsID of challenges you're in

                console.log(allID);
                if (!allID || !Array.isArray(allID) || allID.some(id => typeof id !== 'string')) {
                    throw new Error("Invalid document IDs received");
                }

                //Some (only old) might be excluded bacuase of missing TimePosted 
                let allPosts = await readDocumentsInArray("Posts", [], [{ field: "TimePosted", direction: "desc" }], allID); //Get the posts - sorted by TimePosted

                //Add usernames to all postCreators
                let allPostsWithUsername = await Promise.all(allPosts.map(async post => {

                    const users = await readSingleUserInformation("Users", post.PostedBy);

                    return {
                        ...post,
                        PostedByUsername: users.Username || "Unknown User",
                        PostedByProfilePicture : users.ProfilePicture || defaultImage
                    };
                }));

                //Set all posts with usernames to later be displayed
                setAllPostsYourShouldSee(allPostsWithUsername)

            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: "#f8f9ff"}}>
             <View style={{ marginTop: 55, marginBottom: 10 }}>
                <Header navigation={navigation} pageName={"Feed"} />
            </View>

            <ScrollView pagingEnabled={true} horizontal={false}>
                {allPostsYourShouldSee ? allPostsYourShouldSee.map((post, index) => (
                    <View key={index} style={{ marginBottom: 15, }}>
                        <UploadedChallengeToFeed 
                            username={post.PostedByUsername}
                            profilePicture={{uri: post.PostedByProfilePicture}}
                            description={post.TaskDescription} 
                            postUri={post.PostUri} 
                            likedBy={post.LikedBy}
                            postID={post.id}
                            challengeID={post.FromChallenge || false}
                            navigation={navigation}
                        />
                    </View>
                )) : (
                    <Text style={{textAlign: "center"}}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}
