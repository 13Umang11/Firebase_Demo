import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  LoginManager, //custom button
  LoginButton, // default button
  AccessToken,
  Settings, // this is for mutltipul User Id's
  Profile,
  GraphRequest,
  GraphRequestManager,
  UserData,
} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutF = ({navigation, route}) => {
  // const profile = route.params.currentProfile;
  const [name, setname] = useState('');
  const [pic, setpic] = useState('');
  const [id, setid] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('name').then(name => {
        if (name) {
          setname(name);
        }
      });
      await AsyncStorage.getItem('userID').then(userID => {
        if (userID) {
          setid(userID);
        }
      });
      await AsyncStorage.getItem('imageURL').then(imageURL => {
        if (imageURL) {
          setpic(imageURL);
        }
      });
      await AsyncStorage.getItem('email').then(email => {
        if (email) {
          setemail(email);
        }
      });
    } catch (e) {
      console.log('Value Not Display', e);
    }
  };

  const accountLogout = async () => {
    LoginManager.logOut();
    const token = await AccessToken.getCurrentAccessToken();
    if (token === null) {
      navigation.navigate('Login');
    }
  };

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
          source={{uri: pic, priority: 'high'}}
        />

        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User Id :-
          </Text>
          {id}
        </Text>
        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User name :-
          </Text>
          {name}
        </Text>
        <Text style={{margin: 10}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            User email :-
          </Text>
          {email}
        </Text>

        <TouchableOpacity
          onPress={accountLogout}
          style={styles.button}
          pressRetentionOffset={{bottom: 30, left: 20, right: 20, top: 20}}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutF;

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
