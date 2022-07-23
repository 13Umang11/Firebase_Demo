import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './App/Navigation/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
