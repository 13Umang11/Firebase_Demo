import React from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function CreateTable() {
  const User = () => {
    // firestore()
    //   .collection('Users')
    //   .doc('ABC')
    //   .update({
    //     age: 35,
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
    firestore()
      .collection('Users')
      .doc('ABCsdcdsd')
      .set({
        name: 'Ada Lovelace',
        age: 30,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('User added!');
      });
    // firestore()
    //   .collection('Users')
    //   .add({
    //     name: 'Ada Lovelace',
    //     age: 30,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    // const userDocument = firestore().collection('Users').doc('ABC');
    // console.log('usersCollection', userDocument);
  };

  return (
    <View>
      <Text>ddssd</Text>
      <Button title="Add" onPress={User} />
    </View>
  );
}
