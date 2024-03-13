import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

import TaskNotCompleteComponent from './src/components/TaskNotCompleteComponent.js';
import TaskIsCompleteComponent from'./src/components/TaskIsCompleteComponent.js';

import TaskComponent from './src/components/TaskComponent.js';
import Home from './src/screens/home.js';



const Stack = createNativeStackNavigator();

export default function App() {
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
      <TaskNotCompleteComponent
        description="Eat a Raw Egg"
        membersCompletedTask={["Erik", "Paul"]}
        totalMembersInChallenge={6}
      />
      <TaskIsCompleteComponent
        description="Play Sport for 20 min"
        membersCompletedTask={["John", "Alice", "Svend"]}
        totalMembersInChallenge={8}
      />
      <TaskNotCompleteComponent
        description="Eat A Raw Onion"
        membersCompletedTask={["John", "Alice", "Svend"]}
        totalMembersInChallenge={8}
      />
      <TaskNotCompleteComponent
        description="Cut 10 cm of your hair"
        membersCompletedTask={["John", "Alice", "Svend"]}
        totalMembersInChallenge={8}
      />
      <TaskNotCompleteComponent
        description="Don’t wear socks for a day"
        membersCompletedTask={["John", "Alice", "Svend"]}
        totalMembersInChallenge={8}
      />
    </View>
  );
}