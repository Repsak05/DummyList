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

function getAllTeams(challenge) // [[p1, p2], [p3,p4,p5], [p6]...]
{
    let allTeams = [];
    if(challenge.teams) //Could be removed if wrongful created values in DB is removed
    {
        for(let team of challenge.teams)
        {
            allTeams.push(team.members);
        }
    }

    return allTeams;
}

function getHowManyTasksEachTeamHasCompleted(challenge) // {0: 7, 1 : 4, 2 : 9} //TeamIndex : amountOfTaskComplete
{
    const teams = getAllTeams(challenge);
    let map = {};
    let index = 0;

    for(let team of teams)
    {

        for(let task of challenge.tasks)
        {
            if(hasTeamCompletedTask(task, team))
            {
                if(map[index]){
                    map[index] += 1;
                }else{
                    map[index] = 1;
                }
            }
        }

        if(!map[index]){
            map[index] = 0;
        }

        index += 1;
    }

    return map;
}

function getLeaderboard(obj) //Output e.g.: [2, 0, 1] from input: {0: 7, 1 : 4, 2 : 9} //gets index of teamNum-1 in order of placement 
{
    const entries = Object.entries(obj);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
    const sortedKeys = sortedEntries.map(entry => parseInt(entry[0]));

    return sortedKeys;
}

function getYourTeamPlacement(challenge, id) //Use this function rather than calculatePlacementFromSortedArr in Home
{
    let placement = challenge.teams.length;
    const teams = getAllTeams(challenge);
    let incrementingPlacement = 1;
    
    const playerPlacement = getLeaderboard(getHowManyTasksEachTeamHasCompleted(challenge));
    for(let teamValue of playerPlacement)
    {
        const indexTeam = teamValue;
        
        for(let member of teams[indexTeam])
        {
            if(member == id){
                placement = incrementingPlacement;
                return placement;
            }
        }
        incrementingPlacement++;
    }

    return placement;
}

export {getYourTeamPlacement, getLeaderboard, getAllTeams, getHowManyTasksEachTeamHasCompleted, hasTeamCompletedTask, getAllMembersWhoFinnishedTheTask, getRandomNumber, getTeams, calculateTimeLeft, differenceInTime, calculatePlacement, getAllChallenges, calculateLevel, calculateXPNeeded, getProfilePic}