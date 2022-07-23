import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UpdateScreen from './UpdateScreen';
import Viewall from './Viewall';
import SetScreen from './SetScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SetScreen"
          component={SetScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Viewall"
          component={Viewall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateScreen"
          component={UpdateScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
