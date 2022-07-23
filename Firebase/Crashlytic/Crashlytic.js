import React, {useEffect, useState} from 'react';
import {View, Button, TextInput, Text, StyleSheet, SafeAreaView} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

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

export default function App() {
  const [uid, setuid] = useState('');

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <TextInput
        style={styles.textinput}
        placeholder="UID"
        onChangeText={setuid}
        value={uid}
        autoCorrect={false}
        maxLength={10}
      />

      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: uid,
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
      />
      <Text style={{color: '#000', fontSize: 18, marginVertical: 20}}>
        uid:- {uid}
      </Text>
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
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
