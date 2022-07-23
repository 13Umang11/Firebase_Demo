import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import dynamicLinks, {firebase} from '@react-native-firebase/dynamic-links';

export default function Week5Button({navigation}) {
  useEffect(() => {
    // dynamic Link
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link.url === 'https://firebasedemo123.page.link/demolink123') {
          console.log('red', link);
          navigation.navigate('Dynamic');
          // ...set initial route as offers screen
        }
      });

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    console.log(unsubscribe);

    return () => unsubscribe();
  }, []);

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://firebasedemo123.page.link/demolink123') {
      // ...navigate to your offers screen
      console.log('blue', link);
      navigation.navigate('Dynamic');
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Googleindex')}>
        <Text style={styles.btntext}>Authentication</Text>
      </TouchableOpacity>
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
      {/*  <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Fileindex')}>
        <Text style={styles.btntext}>Working with Files</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('ImageComponent')}>
        <Text style={styles.btntext}>Image Gallary View</Text>
      </TouchableOpacity> */}
    </View>
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
