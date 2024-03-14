import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

import TaskComponent from './src/components/TaskComponent.js';
import GoToLeaderboard from './src/components/GoToLeaderboard.js';

import Home from './src/screens/home.js';

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
          component={Home}
          //options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Home/> */}
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