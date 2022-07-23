import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Logout = ({navigation, route}) => {
  const userData = route.params.userInfo;
  console.log(route);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => {
        navigation.navigate('Login');
      });
      // setuser({route: null}); becuse there ts no data in setuser
      console.log('log out complete');
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
      navigation.goBack();
    }
  };
  // console.log(route);
  // console.log(route.params.name);
  return (
    <View
      style={{
        backgroundColor: '#37a8c4',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#cec0ed',
          height: 300,
          width: '80%',
          justifyContent: 'center',
          top: 200,
          left: 35,
          borderRadius: 30,
        }}>
        <Image
          style={{
            height: 80,
            width: 80,
            bottom: 260,
            position: 'absolute',
            alignSelf: 'center',
            borderRadius: 200,
          }}
          source={{uri: userData.photo}}
        />
        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User Id :-
          </Text>
          {userData.id}
        </Text>
        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User name :-
          </Text>
          {userData.name}
        </Text>
        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User email :-
          </Text>
          {userData.email}
        </Text>

        <TouchableOpacity
          onPress={signOut}
          style={styles.button}
          pressRetentionOffset={{bottom: 30, left: 20, right: 20, top: 20}}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF7F7F',
    textAlign: 'center',
    width: 120,
    padding: 15,
    margin: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
