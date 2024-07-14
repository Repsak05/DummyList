import { readData, readSingleUserInformation, readDataWithQuery } from "../../firebase";
import { defaultImage } from "../defaultValues";

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
        if(countPairs.length < challenge.joinedMembers.length){
            for(let i = countPairs.length; i<challenge.joinedMembers.length; i++){
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
                        if(member.hasCompletedTask && member.postID)
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

const theDefaultImage = {uri : defaultImage};
async function getProfilePic(userID) //?DB can probably be improved by only retrieving .ProfilePicture
{
    try{
        let profilePic;
        if(userID == global.userInformation.id)
        {
            profilePic = global.userInformation.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : theDefaultImage;

        }else {
            const profileInfo = await readSingleUserInformation("Users", userID);
            profilePic = profileInfo.ProfilePicture ? {uri: profileInfo.ProfilePicture} : theDefaultImage;
        }

        return profilePic

    }catch(err){
        console.log('Failed to get profile picture');
        console.error(err);
    }
}

function calculateTimeLeft(challenge, getFloatValueInHours = false)
{
    if(challenge.gameMode == "Long List")
    {
        if (!challenge.endingTime || typeof challenge.endingTime.seconds === 'undefined' || typeof challenge.endingTime.nanoseconds === 'undefined') {
            // console.error('Invalid endingTime format:', challenge.endingTime, " in ", challenge.id, " was probably made without endingTime");
            return 'Invalid endingTime';
        }

        let currentDate = new Date();
        let endTime = new Date(challenge.endingTime.seconds * 1000 + challenge.endingTime.nanoseconds / 1000000); // Convert timestamp to Date object
    
        let timeLeftMilliseconds = endTime - currentDate; // Time left in milliseconds
        let timeLeftHours = timeLeftMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

        if(getFloatValueInHours){
            return timeLeftHours;
        }

        if(timeLeftHours > 24)
        {
            const timeLeftDays = timeLeftHours/24
            return `${timeLeftDays.toFixed(2)} Days Left`;
        }

        return `${timeLeftHours.toFixed(2)} Hours Left`;
    }else {
        return `No Time Limit`;
    }
}

function getTeams(theChosenTeamNum = chosenTeam, maxNumberOfTeams)
{
    let teams = [];


    //Create team structure: [{members : []}, {members : [user1, user2]}, {members: [user3]}]
    for(let i = 0; i<maxNumberOfTeams; i++)
    {
        if(theChosenTeamNum == i + 1)
        {
            if(!teams[i]){
                teams[i] = { members: [global.userInformation.id] };
            }else {
                teams[i].members.push(global.userInformation.id);
            }

        }else {
            if(!teams[i]){
                teams[i] = { members : []};
            }
        }
    }

    console.log(teams);
    return teams;
}

function hasTeamCompletedTask(task, team = yourTeam)
{
    for(let teamMember of team)
    {
        for(let challengeMember of task.friendsTask)
        {
            if(challengeMember.hasCompletedTask && challengeMember.friendID == teamMember){
                return true;
            }
        }
    }
    return false;
}

function getRandomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function getAllMembersWhoFinnishedTheTask(task) {
    const allFriendsIDWhoFinnished = [];
    task.friendsTask.map(friend => {
        if (friend.hasCompletedTask) {
            allFriendsIDWhoFinnished.push(friend.friendID);
        }
    });
    return allFriendsIDWhoFinnished;
}

export {hasTeamCompletedTask, getAllMembersWhoFinnishedTheTask, getRandomNumber, getTeams, calculateTimeLeft, differenceInTime, calculatePlacement, getAllChallenges, calculateLevel, calculateXPNeeded, getProfilePic}