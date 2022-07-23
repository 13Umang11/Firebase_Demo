import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  AppState,
  SafeAreaView,
  Alert,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {firebase} from '@react-native-firebase/auth';

import Header from '../../customcomponets/Header';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function FirebaseButton({navigation, route}) {
  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       handleDynamicLink(link);
  //     });

  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   return () => unsubscribe();
  // }, []);

  // const handleDynamicLink = link => {
  //   if (link.url === 'https://firebasedemo123.page.link/demolink123') {
  //     console.log('Dynamic 2', link.url);
  //     setTimeout(() => {
  //       navigation.navigate('Dynamic');
  //     }, 2000);
  //   }
  // };

  function Warning() {
    Alert.alert('Alert', 'Are you sure you want to logout?', [
      {
        text: 'Cancal',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'OK',
        onPress: () => SignOut(),
      },
    ]);
  }

  const SignOut = async () => {
    const user = firebase.auth().currentUser;
    const token = (await user.getIdTokenResult()).signInProvider;
    if (token == 'google.com') {
      console.log('google.com');
      firebase.auth().signOut();
      await GoogleSignin.signOut().then(data => {
        console.log('Sign Out......', data);
        // navigation.replace('AuthStack');
      });
    } else {
      console.log('fvisvahfjvhjkadhvkjdvjkdfkvdjkzdjklfvdfjkv');
      await firebase
        .auth()
        .signOut()
        .then(data => {
          console.log('Sign Out......', data);
          // navigation.replace('AuthStack');
        });
    }
    // navigation.replace('AuthStack');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header title="Firebase" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('FireStore')}>
            <Text style={styles.btntext}>FireStore DataBase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Dynamic')}>
            <Text style={styles.btntext}>Dynamic Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Crashlytic')}>
            <Text style={styles.btntext}>Crashlytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Analytics')}>
            <Text style={styles.btntext}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('LocalNotification')}>
            <Text style={styles.btntext}>Local Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btn, marginTop: 100, backgroundColor: 'red'}}
            onPress={() => Warning()}>
            <Text style={styles.btntext}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#007ACC',
    width: '95%',
    margin: 10,
    borderRadius: 10,
  },
  btntext: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },
});
