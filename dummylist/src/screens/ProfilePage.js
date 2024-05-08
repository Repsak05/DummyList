import React, { useEffect, useState } from "react";
import { View, Image, Button, Pressable, Text} from 'react-native';
import style from "../style";

import Header from "../components/Header";
import ProfileUserInformation from "../components/ProfileUserInformation";
import ProfileAchievements from "../components/ProfileAchievements";
import ProfileChallengesOverview from "../components/ProfileChallengesOverview";
import { firebaseAuth, readSingleUserInformation } from "../../firebase";
import WelcomePage from "./WelcomePage";
import { calculateXPNeeded } from "../components/GlobalFunctions";

export default function ProfilePage({navigation})
{ //TODO: Change achievements to db values (Add xp instead of level, and add achievements)
    
    const [currentXP, setCurrentXP] = useState(0); //LeftOverXP
    const [currentLevel, setCurrentLevel] = useState();
    const [xpNeededToLevelUp, setXpNeededToLevelUp] = useState();
    const [stats, setStats] = useState();


    useEffect(() => {
        async function getPersonalInformation()
        {
            try{
                const res = await readSingleUserInformation("Users", global.userInformation.id);
                setCurrentLevel(res.Level || 1);
                setCurrentXP((res.XP || 0) - calculateXPNeeded(res.Level - 1 || 0));
                setXpNeededToLevelUp(calculateXPNeeded(res.Level || 1) - calculateXPNeeded(res.Level - 1 || 0));
                setStats(res.Stats || false);

            }catch(err){
                console.error(err)
            }
        }

        getPersonalInformation();
    }, [])


    return(
        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#D0E4FF", position: "relative"}}>
            <Image style={{ width: "100%", height: 341}} source={{uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft"}}/>
            
            <View style={{position: "absolute", top: 55, left: 0, width: "100%"}}>
                <Header pageName={" "} navigation={navigation} isOnProfilePage={true}/>
            </View>

            <View style={{marginTop: 28}}>
                <ProfileUserInformation 
                    username={global.userInformation?.Username || "GuestUser#404"}
                    email={global.userInformation?.Email || "GuestEmail404@gmail.com"}
                    level={currentLevel || global.userInformation?.Level || 404}
                    xpCurrent={currentXP}
                    xpToLevelUp={xpNeededToLevelUp}
                />
            </View>

            <View style={{flexDirection: "column", marginTop: 15, width: "90%", alignSelf: "center"}}>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                    <ProfileAchievements typeNumber={1} value={stats?.AveragePlacement || 0}/>
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