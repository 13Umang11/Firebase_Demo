import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Googleindex from './Authentication/Googleindex';
import FireStore from './FireStore/FireStore';
import FireBaseButton from './FirebaseButton';
import DynamicLink from './DynamicLink/Dynamic';
import Crashlytic from './Crashlytic/Crashlytic';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirebaseButton" component={FireBaseButton} />
      <Stack.Screen name="Googleindex" component={Googleindex} />
      <Stack.Screen name="FireStore" component={FireStore} />
      <Stack.Screen name="Dynamic" component={DynamicLink} />
      <Stack.Screen name="Crashlytic" component={Crashlytic} />

      {/* <Stack.Screen name="Defaultshare" component={Defaultshare} />
      <Stack.Screen name="Share" component={Share} />
      <Stack.Screen name="Fileindex" component={Fileindex} />
      <Stack.Screen name="ImageComponent" component={ImageComponent} /> */}
    </Stack.Navigator>
  );
}
