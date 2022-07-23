import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddTasks from './AddTasks';
import ReadData from './ReadData';

const Stack = createStackNavigator();

const Main = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="ReadData">
      <Stack.Screen
        name="AddTasks"
        component={AddTasks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReadData"
        component={ReadData}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default Main;
