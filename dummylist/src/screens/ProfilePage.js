import React, { useEffect, useState } from "react";
import { View, Image, Button, Pressable, Text} from 'react-native';
import style from "../style";

import Header from "../components/Header";
import ProfileUserInformation from "../components/ProfileUserInformation";
import ProfileAchievements from "../components/ProfileAchievements";
import ProfileChallengesOverview from "../components/ProfileChallengesOverview";
import { calculateXPNeeded } from "../components/GlobalFunctions";
import { defaultEmail, defaultImage, defaultLevel, defaultName } from "../defaultValues";

export default function ProfilePage({navigation})
{ //TODO: Change achievements to db values (Add xp instead of level, and add achievements)
    
    const currentXP = (global.userInformation.XP || 0) - calculateXPNeeded(global.userInformation.Level - 1 || 0); //LeftOverXP
    const currentLevel = global.userInformation.Level || 1;
    const xpNeededToLevelUp = calculateXPNeeded(global.userInformation.Level || 1) - calculateXPNeeded(global.userInformation.Level - 1 || 0);
    const stats = global.userInformation.Stats || false;

    const [avgPlacement, setAvgPlacement] = useState();


    useEffect(() => {
        if(stats)
        {
            let totalPlacement = 0;
            let totalMembers = 0;

            for(let obj of stats.AveragePlacement)
            {
                totalPlacement += obj.placement;
                totalMembers += obj.amountOfMembers;
            }
    
            const avgPlacementNum = totalPlacement/stats.AveragePlacement.length;
            const avgPlacementProcent = totalPlacement/totalMembers * 100; //Value in % doesn't rlly makes sense if this format
    
            setAvgPlacement(avgPlacementNum);
        }
    }, [stats])


    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#D0E4FF", position: "relative"}}>
            <Image style={{height: 341, width: "auto"}} source={global.userInformation?.ProfilePicture ? {uri: global.userInformation.ProfilePicture} : {uri: defaultImage}}/>
            
            <View style={{position: "absolute", top: 55, left: 0, width: "100%"}}>
                <Header pageName={" "} navigation={navigation} isOnProfilePage={true}/>
            </View>

            <View style={{marginTop: 28}}>
                <ProfileUserInformation 
                    username={global.userInformation?.Username || defaultName}
                    email={global.userInformation?.Email || defaultEmail}
                    level={currentLevel || global.userInformation?.Level || defaultLevel}
                    xpCurrent={currentXP}
                    xpToLevelUp={xpNeededToLevelUp}
                />
            </View>

            <View style={{flexDirection: "column", marginTop: 15, width: "90%", alignSelf: "center"}}>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                    <ProfileAchievements typeNumber={1} value={avgPlacement || 0}/>
                    <ProfileAchievements typeNumber={2} value={stats?.ChallengesWon || 0}/>
                </View>

                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 11}}>
                    <ProfileAchievements typeNumber={3} value={stats?.TaskCompleted || 0}/>
                    <ProfileAchievements typeNumber={4} value={stats?.TimesParticipated || 0}/>
                </View>
            </View>

            <View style={{marginTop: 15}}>
                <ProfileChallengesOverview navigation={navigation}/>
            </View>
        </View>
    )
}