import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

import TaskNotCompleteComponent from './src/components/TaskNotCompleteComponent.js';
import TaskIsCompleteComponent from'./src/components/TaskIsCompleteComponent.js';
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
      <GoToLeaderboard
        placement="1"
        allPlayers={["Erik", "Paul", "Svend", "Henrik", "Søren", "Knud"]}
      />
    </View>
  );
}