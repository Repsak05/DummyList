import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import UploadedChallengeToFeed from "../components/UploadedChallengeToFeed";

import { readData, readSingleUserInformation, readDocumentsInArray } from "../../firebase";
import {getAllChallenges} from "../components/GlobalFunctions"

export default function FeedPage({ navigation }) 
{   //TODO: Replace Loading... with correct loading screen
        //Only load a few posts at a time
    //TODO: When liking image: Add it to db

    //Change this to the user's profilepicture in users db
    const exampleURI = "https://as1.ftcdn.net/v2/jpg/05/68/23/98/1000_F_568239815_8NB11CB6LT2D3lBhDVa10jQ6qMYJKCzh.jpg"
       
    const [allPostsYourShouldSee, setAllPostsYourShouldSee] = useState();

    useEffect(() => {
        async function fetchData()
        {
            try {
                let allID = await getAllChallenges(); //Gets all postsID of challenges you're in
                let allPosts = await readDocumentsInArray("Posts", [], [], allID); //Get the posts


                //Add usernames to all postCreators
                let allPostsWithUsername = await Promise.all(allPosts.map(async post => {

                    const users = await readSingleUserInformation("Users", post.PostedBy)
                    let postedByName = users.Username || "Unknown User";

                    return {
                        ...post,
                        PostedByUsername: postedByName,
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
        <View style={{ flex: 1 }}>
             <View style={{ marginTop: 55, marginBottom: 10 }}>
                <Header navigation={navigation} pageName={"Feed"} />
            </View>

            <ScrollView pagingEnabled={true} horizontal={false}>
                {allPostsYourShouldSee ? allPostsYourShouldSee.map((post, index) => (
                    <View key={index} style={{ marginBottom: 15, }}>
                        <UploadedChallengeToFeed 
                            username={post.PostedByUsername}
                            profilePicture={{uri: exampleURI}}
                            description={post.TaskDescription} 
                            postUri={post.PostUri} 
                            likedBy={post.LikedBy}
                            postID={post.id}
                        />
                    </View>
                )) : (
                    <Text style={{textAlign: "center"}}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}
