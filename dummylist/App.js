import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Oswald_400Regular, Oswald_500Medium } from '@expo-google-fonts/oswald';
import { onAuthStateChanged } from 'firebase/auth';
import { readData, addToCollection, readSingleUserInformation, firebaseAuth, firestore } from './firebase.js';


// Import your screen components
import Home from './src/screens/Home.js';
import WelcomePage from './src/screens/WelcomePage.js';
import LoadingPage from './src/screens/LoadingPage.js';
import FriendsPage from './src/screens/FriendsPage.js';
import FeedPage from './src/screens/FeedPage.js';
import ProfilePage from './src/screens/ProfilePage.js';
import AcceptChallengeOverviewPage from './src/screens/AcceptChallengeOverviewPage.js';
import InvitedChallengesPage from './src/screens/InvitedChallengesPage.js';
import CreateChallengePageOne from './src/screens/CreateChallengePageOne.js';
import CreateChallengePageTwo from './src/screens/CreateChallengePageTwo.js';
import CreateChallengePageThree from './src/screens/CreateChallengePageThree.js';
import AllFriendsPage from './src/screens/AllFriendsPage.js';
import CameraPage from './src/screens/CameraPage.js';
import ChallengePage from './src/screens/ChallengePage.js';
import LeaderboardPage from './src/screens/LeaderboardPage.js';
import SignUpPage from './src/screens/SignUpPage.js';
import LogInPage from './src/screens/LogInPage.js';
import CalendarPage from './src/screens/CalendarPage.js';
import RewardPage from './src/screens/RewardPage.js';
import SettingsPage from './src/screens/SettingsPage.js';
import AccountSettingsPage from './src/screens/AccountSettingsPage.js';
import NotificationSettingsPage from './src/screens/NotificationSettingsPage.js';
import LanguageSettingsPage from './src/screens/LanguageSettingsPage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
  });
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      
      setUser(user); //user: db -> authentication
      
      if(user)
      {
        const gottenUserInformation = await retrieveUserInformation(user.uid)
        global.userInformation = gottenUserInformation 
        global.loggedInID = gottenUserInformation.id
        global.userUID = user.uid
      }
    });

    async function retrieveUserInformation(uid)
    {
      try{
        const res = await readData("Users")
        
        let theUser //Object in Firestorage Database
        res.map(account => {
          if(account.uid == uid){
            theUser = account
          }
        })
        return theUser

      }catch(err){
        console.log(err)
      }
    }
    
    return unsubscribe;
  }, []);
  
  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
        name="LanguageSettingsPage"
        component={LanguageSettingsPage}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="NotificationSettingsPage"
        component={NotificationSettingsPage}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="SettingsPage"
        component={SettingsPage}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="AccountSettingsPage"
        component={AccountSettingsPage}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="RewardPage"
        component={RewardPage}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingPage"
          component={LoadingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FriendsPage"
          component={FriendsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedPage"
          component={FeedPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarPage"
          component={CalendarPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AcceptChallengeOverviewPage"
          component={AcceptChallengeOverviewPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvitedChallengesPage"
          component={InvitedChallengesPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateChallengePageOne"
          component={CreateChallengePageOne}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateChallengePageTwo"
          component={CreateChallengePageTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateChallengePageThree"
          component={CreateChallengePageThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllFriendsPage"
          component={AllFriendsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChallengePage"
          component={ChallengePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderboardPage"
          component={LeaderboardPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogInPage"
          component={LogInPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
