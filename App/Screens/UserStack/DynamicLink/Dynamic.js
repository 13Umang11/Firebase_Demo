import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  AppState,
  SafeAreaView,
} from 'react-native';
import dynamicLinks, {firebase} from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import Header from '../../../customcomponets/Header';

export default function DynamicLink({navigation}) {
  useEffect(() => {
    // dynamicLinks()
    //   .getInitialLink()
    //   .then(link => {
    //     console.log(link);
    //     if (link.url === 'https://firebasedemo123.page.link/demolink123') {
    //       navigation.navigate('Dynamic');
    //     }
    //   });

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log(link);
        if (link.url === 'https://firebasedemo123.page.link/demolink123') {
          navigation.navigate('Dynamic');
        }
      });

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  const handleDynamicLink = link => {
    if (link.url === 'https://firebasedemo123.page.link/demolink123') {
      navigation.navigate('Dynamic');
    }
  };

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

    Share.open({message: 'Firebase\n', url: link})
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          title="Dynamic Link"
          show={true}
          goBack={() => navigation.navigate('FirebaseButton')}
        />

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
      </View>
    </SafeAreaView>
  );
}

// social: {
//   title: 'Social Application',
//   descriptionText: 'A Social Application',
//   imageUrl:
//     'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
// },
// const image = decodeURIComponent('A%20Social%20Application');
// const image = decodeURIComponent(
//   'https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885__480.jpg',
// );
// const start = image.indexOf('si=') + 3;
// const end = image.indexOf('st=') - 1;
// const slice = image.slice(start, end);
// console.log(image);
