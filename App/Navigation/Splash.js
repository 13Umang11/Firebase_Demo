import React, {useEffect} from 'react';
import {View, ToastAndroid, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import {firebase} from '@react-native-firebase/auth';

export default function Splash({navigation}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // const user = firebase.auth().currentUser;
      if (user) {
        console.log('Splash');
        navigation.replace('UserStack');
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            `Welcome ${
              user.phoneNumber ? user?.phoneNumber : user?.displayName
            }`,
            ToastAndroid.SHORT,
          );
        } else {
          Toast.show(
            `Welcome ${
              user.phoneNumber ? user?.phoneNumber : user?.displayName
            }`,
            Toast.SHORT,
            ['UIAlertController'],
          );
        }

        SplashScreen.hide();
      } else {
        navigation.replace('AuthStack');
        if (Platform.OS === 'android') {
          ToastAndroid.show(`Welcome`, ToastAndroid.SHORT);
        } else {
          Toast.show(`Welcome`, Toast.SHORT, ['UIAlertController']);
        }

        SplashScreen.hide();
      }
    });
  }, []);

  return <View />;
}
