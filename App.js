import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Opcion1Screen from './screens/Opcion1Screen';
import Opcion2Screen from './screens/Opcion2Screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Opcion1" component={Opcion1Screen} options={{ title: 'Opción 1' }} />
        <Stack.Screen name="Opcion2" component={Opcion2Screen} options={{ title: 'Opción 2' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
