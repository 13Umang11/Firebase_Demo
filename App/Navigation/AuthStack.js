import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SocialAuth from '../Screens/AuthStack/SocialAuth';
import ConfirmationCode from '../Screens/AuthStack/ConfirmationCode';
import PhoneAuth from '../Screens/AuthStack/PhoneAuth';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SocialAuth">
      <Stack.Screen
        name="SocialAuth"
        component={SocialAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmationCode"
        component={ConfirmationCode}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
