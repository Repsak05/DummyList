import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

//Screens
import Home from './src/screens/Home.js';
import ChallengePage from './src/screens/ChallengePage.js';
import LeaderboardPage from './src/screens/LeaderboardPage.js';
import ProfilePage from './src/screens/ProfilePage.js';
import CameraPage from './src/screens/CameraPage.js';
import FeedPage from './src/screens/FeedPage.js';
import CreateChallengePageOne from './src/screens/CreateChallengePageOne.js';
import CreateChallengePageTwo from './src/screens/CreateChallengePageTwo.js';
import CreateChallengePageThree from './src/screens/CreateChallengePageThree.js';
import FriendsPage from './src/screens/FriendsPage.js';
import AllFriendsPage from './src/screens/AllFriendsPage.js';
import InvitedChallengesPage from './src/screens/InvitedChallengesPage.js';
import AcceptChallengeOverviewPage from './src/screens/AcceptChallengeOverviewPage.js';
import LoadingPage from './src/screens/LoadingPage.js';

import LogInPage from './src/screens/LogInPage.js';
import SignUpPage from './src/screens/SignUpPage.js';
import WelcomePage from './src/screens/WelcomePage.js';

import { useFonts, Oswald_400Regular, Oswald_500Medium } from '@expo-google-fonts/oswald';


const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
      Oswald_400Regular,
      Oswald_500Medium,
  });
  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="LoadingPage"
            component={LoadingPage}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
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
            name="Home"
            component={Home}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
