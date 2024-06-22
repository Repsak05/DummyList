import { readData, readSingleUserInformation, readDataWithQuery } from "../../firebase";

function calculatePlacement(challenge, id = global.userInformation.id, getNumberOfCompletedChallenges = false, getAllPlacements = false)
{
    const counts = {}

    challenge.tasks.map(task => {
        task.friendsTask.map(taskFriends => {
            if(taskFriends.hasCompletedTask){
                counts[taskFriends.friendID] = counts[taskFriends.friendID] + 1 || 1;
            }
        })
    })

    if(getAllPlacements)
    {
        return counts;

    } else if(!getNumberOfCompletedChallenges)
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
        if(global?.userInformation?.id)
        {
            
            let allChallengesThatYouAreIn = await readDataWithQuery(
                "Challenges",
                [
                    { field: "joinedMembers", operator: "array-contains", value: global.userInformation?.id },
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
        }else{
            console.log("MISSING ID - called from globalFunctions" );
        }

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

const defaultImage = {uri : "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg"};
async function getProfilePic(userID) //?DB can probably be improved by only retrieving .ProfilePicture
{
    try{
        let profilePic;
        if(userID == global.userInformation.id)
        {
            profilePic = global.userInformation.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : defaultImage;

        }else {
            const profileInfo = await readSingleUserInformation("Users", userID);
            profilePic = profileInfo.ProfilePicture ? {uri: profileInfo.ProfilePicture} : defaultImage;
        }

        return profilePic

    }catch(err){
        console.log('Failed to get profile picture');
        console.error(err);
    }
}

export {differenceInTime, calculatePlacement, getAllChallenges, calculateLevel, calculateXPNeeded, getProfilePic}