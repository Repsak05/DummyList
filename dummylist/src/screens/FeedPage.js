import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, } from 'react-native';
import style from "../style";

import Header from "../components/Header";
import UploadedChallengeToFeed from "../components/UploadedChallengeToFeed";

import { readData } from "../../firebase";

export default function FeedPage({ navigation }) 
{   //TODO: ___Create correct statement in getPosts (look coment) 
    //Replace Loading... with correct loading screen
    //When liking image: Add it to db

    //Change this to the user's profilepicture in users db
    const exampleURI = "https://as1.ftcdn.net/v2/jpg/05/68/23/98/1000_F_568239815_8NB11CB6LT2D3lBhDVa10jQ6qMYJKCzh.jpg"
       
    const [allPostsYourShouldSee, setAllPostsYourShouldSee] = useState();

    useEffect(() => {
        async function getPosts(){
            try{
                const posts = await readData("Posts");

                const yourFeedposts = await Promise.all(posts.map(async post => {
                    if(true) //Statement so only postID's which is in a challenge your are in too would be added
                    {
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
                    }
                }));
                setAllPostsYourShouldSee(yourFeedposts);

            }catch(err){
                console.error(err);
            }
        }

        getPosts();
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
                        />
                    </View>
                )) : (
                    <Text style={{textAlign: "center"}}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}
