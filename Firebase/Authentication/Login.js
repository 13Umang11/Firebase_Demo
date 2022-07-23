import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager, //custom button
  AccessToken,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {call} from '../assets/index';
import SplashScreen from 'react-native-splash-screen';

const Login = ({navigation}) => {
  SplashScreen.hide();
  const [Email, setemail] = useState('');
  const [Password, onpassword] = useState('');
  const [placeuser, setplaceuser] = useState('Username');
  const [placepass, setplacepass] = useState('Password');
  const [color, setcolor] = useState('black');
  const [secure, setsecure] = useState(true);

  const Secure = () => {
    setsecure(!secure);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '380337778784-btitkps0jpn7lestsi1uv8r123johc7t.apps.googleusercontent.com',
      client_type: 3,
      offlineAccess: true,
    });
  });

  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      const userInfo = await GoogleSignin.signIn().then(data => {
        navigation.navigate('Logout', {userInfo: data.user});
      });

      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  }

  const storeData = async (currentProfile, result) => {
    console.log(currentProfile.userID);
    console.log(result);
    try {
      await AsyncStorage.setItem('userID', currentProfile.userID);
      await AsyncStorage.setItem('imageURL', currentProfile.imageURL);
      await AsyncStorage.setItem('name', currentProfile.name);
      await AsyncStorage.setItem('email', result.email).then(() => {
        navigation.navigate('LogoutF');
      });
    } catch (e) {
      console.log(e);
    }
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]).then(function (result) {
      if (result.grantedPermissions) {
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
        );
        const currentProfile = Profile.getCurrentProfile().then(function (
          currentProfile,
        ) {
          AccessToken.getCurrentAccessToken().then(data => {
            const Info = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: {
                    string: 'email',
                  },
                },
              },
              responseInfoCallback,
            );
            new GraphRequestManager().addRequest(Info).start();
            console.log('currentProfile', currentProfile);
          });
          console.log('currentProfile', currentProfile);
          function responseInfoCallback(error, result) {
            if (error) {
              console.log('Error fetching data: ' + JSON.stringify(error));
            } else {
              console.log('Success fetching data: ' + result.email);
              if (currentProfile != null && result != null) {
                storeData(currentProfile, result);
                // navigation.navigate('LogoutF');
              } else {
                navigation.navigate('LogoutF');
              }
            }
          }
        });
        console.log('currentProfile', currentProfile);
      } else {
        console.log('Login cancelled');
      }
    });

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    console.log('data', data);

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <ScrollView style={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
      {/* keybord should Persistent this use for tapable in ScrollView*/}
      <View>
        <Image
          style={{height: 220, width: 220, alignSelf: 'center', margin: 12}}
          source={{
            // uri: pic,
            uri: 'https://cdn2.iconfinder.com/data/icons/scenarium-vol-16/128/016_010_welcome_door_invite_home-256.png',
          }}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.text}>Log into your existant account</Text>
        <View>
          <Image
            style={[styles.image, {position: 'absolute', left: 20, top: 43}]}
            source={{
              uri: 'https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/user4-256.png',
            }}
          />
          <TextInput
            style={[styles.textinput, {marginVertical: 30}]}
            placeholder={placeuser}
            placeholderTextColor={color}
            keyboardType="email-address"
            onChangeText={setemail}
            value={Email}></TextInput>
        </View>
        <View>
          <Image
            style={[styles.image, {position: 'absolute', left: 20, top: 23}]}
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-locked-outline-128.png',
            }}
          />
          <TextInput
            style={[styles.textinput, {marginVertical: 10}]}
            placeholder={placepass}
            placeholderTextColor={color}
            secureTextEntry={secure}
            onChangeText={onpassword}
            value={Password}></TextInput>
          <TouchableOpacity onPress={Secure}>
            <Image
              style={[
                styles.image,
                {position: 'absolute', right: 30, bottom: 23},
              ]}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/709/709612.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <Pressable>
          <Text style={styles.forgot}>Forgot Password</Text>
        </Pressable>
        <View style={{flexDirection: 'row', marginLeft: 40}}>
          <TouchableOpacity style={[styles.btn]}>
            <Text style={styles.btntext}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot')}
            style={[styles.btn, {backgroundColor: 'rgba(172, 106, 196,0.8)'}]}>
            <Image
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                top: 10,
                left: 12,
                tintColor: '#fff',
              }}
              source={call}
            />
            <Text style={[styles.btntext, {color: '#fff', marginLeft: 15}]}>
              Phone
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign: 'center', marginVertical: 15}}>
          Or connect using
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 40}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={onGoogleButtonPress}
              style={[
                styles.btn,
                {backgroundColor: 'rgba(151, 150, 153,0.5)'},
              ]}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  position: 'absolute',
                  top: 7,
                  left: 10,
                }}
                source={{
                  uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-256.png',
                }}
              />
              <Text style={[styles.btntext, {color: 'black', marginLeft: 35}]}>
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => onFacebookButtonPress}
            style={[styles.btn, {backgroundColor: 'rgba(140, 109, 201,0.5)'}]}>
            <Image
              style={{
                height: 24,
                width: 24,
                position: 'absolute',
                top: 7,
                left: 10,
              }}
              source={{
                uri: 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_facebook-256.png',
              }}
            />
            <Text style={[styles.btntext, {color: '#371873', marginLeft: 35}]}>
              FaceBook
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
    fontStyle: 'italic',
    margin: 10,
  },
  text: {
    textAlign: 'center',
  },
  textinput: {
    width: 340,
    borderWidth: 1,
    margin: 10,
    borderRadius: 50,
    paddingHorizontal: 40,
  },
  image: {
    height: 24,
    width: 24,
  },
  forgot: {
    textAlign: 'right',
    margin: 10,
    color: 'blue',
  },
  btntext: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {
    margin: 10,
    backgroundColor: '#3248a1',
    width: 120,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
