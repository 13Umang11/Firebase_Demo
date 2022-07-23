import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthStack from './AuthStack';
import UserStack from './UserStack';
import Splash from './Splash';

const MainStack = createStackNavigator();

export default function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="AuthStack" component={AuthStack} />
      <MainStack.Screen name="UserStack" component={UserStack} />
    </MainStack.Navigator>
  );
}
