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

export {calculatePlacement}