import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {backarrow} from '../assets/index';

export default function Header({title, goBack, show}) {
  return (
    <View
      style={{
        borderBottomColor: '#001854',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}>
      {show && (
        <TouchableOpacity
          style={{
            height: 28,
            width: 28,
            position: 'absolute',
            left: 10,
          }}
          onPress={goBack}>
          <Image source={backarrow} style={styles.headerleft} />
        </TouchableOpacity>
      )}

      <Text style={styles.headertitle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerleft: {
    height: 28,
    width: 28,
    tintColor: '#001854',
  },
  headertitle: {
    // alignSelf: 'center',
    color: '#001854',

    textAlign: 'center',
    fontSize: 24,
    padding: 10,
  },
});
