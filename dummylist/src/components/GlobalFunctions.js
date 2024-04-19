import { readData } from "../../firebase";

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
        console.error("Something went wrong! You might have used the function in a wrong way;\nTho if someone didn't complete any tasks; ignore this error")
        
        //Ensure that if not all completed a task, that they still have a placement
        if(countPairs.length < challenge.friends.length){
            for(let i = countPairs.length; i<challenge.friends.length; i++){
                return i+1;
            }
        }
        console.error("Bruv, wacha doin?")
        
    } else {
        return counts[id] || 0
    }
}



async function getAllChallenges(returnPostsOrChallenges = true)
{
    try{
        const res = await readData("Challenges")
        
        //Check if you are in challenge (If add it)
        let inChallenges = []
        res.map(challenge => {
            
            for (let member in challenge.friends)
            {
                let mem = challenge.friends[member]

                if(mem.user == global.userInformation.id && mem.hasJoined)
                {
                    inChallenges.push(challenge)
                }
            }
        })
        
        if(!returnPostsOrChallenges){
            return inChallenges //Doesnt happen as default
        }

        //Return all postID's in that challenge
        let allPostsID = []

        inChallenges.map(challenge => {
            for(let friendsTask of challenge.tasks)
            {
                for(let member of friendsTask.friendsTask)
                {
                    if(member.hasCompletedTask)
                    {
                        allPostsID.push(member.postID)
                    }
                }
            }
        })

        return allPostsID;
    } catch(err){
        console.error(err)
    }
}

export {calculatePlacement, getAllChallenges}