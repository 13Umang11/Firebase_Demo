import React from 'react';
import {View, Text} from 'react-native';

export default function Header({title}) {
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
      <Text
        style={{
          alignSelf: 'center',
          color: '#001854',
          textAlign: 'center',
          fontSize: 24,
          padding: 10,
        }}>
        {title}
      </Text>
    </View>
  );
}
