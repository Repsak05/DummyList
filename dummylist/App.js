import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Challenge from './Challenge.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './src/style'; 

import TaskComponent from './src/components/TaskComponent.js';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={Challenge}
        options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}