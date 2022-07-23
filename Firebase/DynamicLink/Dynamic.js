import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Button} from 'react-native';
import dynamicLinks, {firebase} from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

export default function DynamicLink() {
  const Link = async () => {
    console.log('async');
    const link = await firebase.dynamicLinks().buildShortLink({
      link: `https://firebasedemo123.page.link/demolink123`,
      android: {
        packageName: 'com.authenticationdemo',
      },
      domainUriPrefix: 'https://firebasedemo123.page.link',
      social: {
        title: 'Dynamic Link',
        descriptionText: 'Dynamic Link Demo',
        imageUrl: 'https://picsum.photos/200/300',
      },
    });

    Share.open({message: 'Hello', url: link})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
    console.log('link', link);
    return link;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={Link}
        style={{backgroundColor: '#371873', margin: 15, borderRadius: 50}}>
        <Text
          style={{
            color: '#fff',
            padding: 10,
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 20,
          }}>
          Share App Link
        </Text>
      </TouchableOpacity>
    </View>
  );
}
