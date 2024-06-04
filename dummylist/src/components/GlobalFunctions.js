import { readData, readSingleUserInformation, readDataWithQuery } from "../../firebase";

function calculatePlacement(challenge, id = global.userInformation.id, getNumberOfCompletedChallenges = false)
{
    const counts = {}

    challenge.tasks.map(task => {
        task.friendsTask.map(taskFriends => {
            if(taskFriends.hasCompletedTask){
                counts[taskFriends.friendID] = counts[taskFriends.friendID] + 1 || 1;
            }
        })
    })

    if(!getNumberOfCompletedChallenges)
    {
        const countPairs = Object.entries(counts);
        countPairs.sort((a, b) => b[1] - a[1]);
    
        
        for(let i = 0; i < countPairs.length; i++)
        {
            if(countPairs[i][0] == id){
                return i+1
            }
        }        
        //Ensure that if not all completed a task, that they still have a placement
        if(countPairs.length < challenge.friends.length){
            for(let i = countPairs.length; i<challenge.friends.length; i++){
                return i+1;
            }
        }
        
    } else {
        return counts[id] || 0
    }
}



async function getAllChallenges(returnPostsOrChallenges = true)
{
    try{

        let allChallengesThatYouAreIn = await readDataWithQuery(
            "Challenges",
            [
                { field: "joinedMembers", operator: "array-contains", value: global.userInformation.id },
                { field: "startingTime", operator: "<", value: new Date()}
            ],
            [
                { field: "startingTime", direction: "desc" }
            ]
        );

        if(!returnPostsOrChallenges){
            return allChallengesThatYouAreIn; //Doesnt happen as default
        }

        //Return all postID's in that challenge
        let allPostsID = [];

        allChallengesThatYouAreIn.map(challenge => {
            for(let friendsTask of challenge.tasks)
            {
                for(let member of friendsTask.friendsTask)
                {
                    if(member.hasCompletedTask)
                    {
                        allPostsID.push(member.postID);
                    }
                }
            }
        })

        return allPostsID;
    } catch(err){
        console.error(err)
    }
}



const increasingXPNeeded = 20;
const baseXP = 10; //needs to be smaller than increasingXPNeeded (or else implement if statement)

function calculateLevel(xp) {

    const level = Math.ceil((xp-baseXP)/increasingXPNeeded) + 1;
    if(level < 0) level = 1;

    return level;
}

function calculateXPNeeded(level) {
    if (level <= 1) {
        return baseXP;
    } else {
        return baseXP + (level - 1) * increasingXPNeeded;
    }
}


function differenceInTime(beginningTime)
{
    const startingTime = beginningTime.toDate();
    const currentTime = new Date();    
    const timeDifferenceMs = startingTime.getTime() - currentTime.getTime(); 
    const timeDifferenceHours = timeDifferenceMs / (1000 * 3600); 

    return timeDifferenceHours;
}

async function getProfilePic(userID) //?DB can probably be improved by only retrieving .ProfilePicture
{
    try{
        let profilePic;
        const defaultImage = {uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"};
        if(userID == global.userInformation.id)
        {
            profilePic = global.userInformation.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : defaultImage;

        }else {
            const profileInfo = await readSingleUserInformation("Users", userID);
            profilePic = profileInfo.ProfilePicture ? {uri: profileInfo.ProfilePicture} : defaultImage;
        }

        return profilePic

    }catch(err){
        console.error(err);
    }
}

export {differenceInTime, calculatePlacement, getAllChallenges, calculateLevel, calculateXPNeeded, getProfilePic}