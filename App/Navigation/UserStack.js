import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FirebaseButton from '../Screens/UserStack/FirebaseButton';
import Crashlytic from '../Screens/UserStack/Crashlytic/Crashlytic';
import Dynamic from '../Screens/UserStack/DynamicLink/Dynamic';
import FireStore from '../Screens/UserStack/FireStore/FireStore';
import LocalNotification from '../Screens/UserStack/Notification/LocalNotification';
import Analytics from '../Screens/UserStack/Analytics/Analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Stack = createStackNavigator();

export default function UserStack({navigation, route}) {
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  const handleDynamicLink = link => {
    if (link.url === 'https://firebasedemo123.page.link/demolink123') {
      console.log('Dynamic 2 UserStack', link.url);
      navigation.navigate('Dynamic');
    }
  };
  console.log('route', route);
  return (
    <Stack.Navigator
      // screenOptions={{presentation: 'modal'}}
      initialRouteName="FirebaseButton">
      <Stack.Screen
        name="FirebaseButton"
        component={FirebaseButton}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FireStore"
        component={FireStore}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Dynamic"
        component={Dynamic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Crashlytic"
        component={Crashlytic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocalNotification"
        component={LocalNotification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
