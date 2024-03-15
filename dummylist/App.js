import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

//Components
import TaskComponent from './src/components/TaskComponent.js';
import LeaderboardPlacement from './src/components/LeaderboardPlacement.js';
import GoToLeaderboard from './src/components/GoToLeaderboard.js'; 
import GoToTasks from './src/components/GoToTasks.js';
import ChallengeTitleInformation from './src/components/ChallengeLeaderboardTitleInformation.js';

//Screens
import Home from './src/screens/Home.js';

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
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Home/> */}
      <ChallengeTitleInformation
        daysLeftTillChallengeEnds={3}
        isChallengeOrLeaderboard={true}
        />
      <ChallengeTitleInformation
        daysLeftTillChallengeEnds={3}
        isChallengeOrLeaderboard={false}
        />
      <GoToTasks
        completeChallenges={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />
      <LeaderboardPlacement
        useranme="Kasper"
        placement={1}
        challengesCompleted={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />
      <LeaderboardPlacement
        useranme="Kasper"
        placement={2}
        challengesCompleted={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />
      <LeaderboardPlacement
        useranme="Kasper"
        placement={3}
        challengesCompleted={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />
      <LeaderboardPlacement
        useranme="Kasper"
        placement={4}
        challengesCompleted={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />
      <LeaderboardPlacement
        useranme="Kasper"
        placement={5}
        challengesCompleted={["Eat an Egg", "Idk"]}
        allChallenges={["Eat an Egg", "Idk", "another", "another2"]}
        />

      <TaskComponent
        description="Eat a nice Egg" 
        membersCompletedTask={["Erik", "Paul"]}
        totalMembersInChallenge = {6}
        isCompleted={true}
        />
      <TaskComponent
        description="Eat a nice Egg" 
        membersCompletedTask={["Erik", "Paul"]}
        totalMembersInChallenge = {6}
        isCompleted={false}
        />
      <GoToLeaderboard
        placement="1"
        allPlayers={["Erik", "Paul", "fjami"]}
      />
    </View>
  );
}