import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import Header from '../../../customcomponets/Header';

async function onSignIn(user) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}

export default function Crashlytics({navigation}) {
  const [uid, setuid] = useState('');

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex: 1}}>
      <Header
        title="Crashlytics"
        show={true}
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <TextInput
          style={styles.textinput}
          placeholder="UID"
          onChangeText={setuid}
          value={uid}
          autoCorrect={false}
          maxLength={10}
        />

        <TouchableOpacity
          onPress={() =>
            onSignIn({
              uid: uid,
              username: 'Joaquin Phoenix',
              email: 'phoenix@example.com',
              credits: 42,
            })
          }
          style={{backgroundColor: '#371873', margin: 15, borderRadius: 50}}>
          <Text
            style={{
              color: '#fff',
              padding: 10,
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 20,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#000', fontSize: 18, marginVertical: 20}}>
          uid:- {uid}
        </Text>
        <TouchableOpacity
          onPress={() => crashlytics().crash()}
          style={{backgroundColor: '#371873', margin: 15, borderRadius: 50}}>
          <Text
            style={{
              color: '#fff',
              padding: 10,
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 20,
            }}>
            Test Crash
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    width: 250,
    marginVertical: 20,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
