import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import UploadedChallengeToFeed from "../components/UploadedChallengeToFeed";

import { readData, readSingleUserInformation } from "../../firebase";
import {getAllChallenges} from "../components/GlobalFunctions"

export default function FeedPage({ navigation }) 
{   //TODO: Replace Loading... with correct loading screen
    //TODO: When liking image: Add it to db
    //DB Reach can be improved a lot

    //Change this to the user's profilepicture in users db
    const exampleURI = "https://as1.ftcdn.net/v2/jpg/05/68/23/98/1000_F_568239815_8NB11CB6LT2D3lBhDVa10jQ6qMYJKCzh.jpg"
       
    const [allPostsYourShouldSee, setAllPostsYourShouldSee] = useState();

    useEffect(() => {

        async function getPosts(IDs)
        {
            //Takes in a list of postID's and outputs the post objects

            try{
                let allPostsInYourFeed = []
                for(let id of IDs)
                {
                    let val = await readSingleUserInformation("Posts", id)
                    allPostsInYourFeed.push(val)
                }

                return allPostsInYourFeed;

            }catch (err){
                console.error(err);
            }
        }

        async function fetchData() 
        {
            try {
                let allID = await getAllChallenges(); //Gets all postsID of challenges you're in
                console.log(allID);

                let allPosts = await getPosts(allID);

                //Add usernames to all postCreators
                let allPostsWithUsername = await Promise.all(allPosts.map(async post => {
                    const users = await readData("Users");
                    let postedByName = "Unknown User";
                    for (let user of users) {
                        if (user.id === post.PostedBy) {
                            postedByName = user.Username;
                            break; 
                        }
                    }

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
