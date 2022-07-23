import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const Radio = () => {
  const RadioProps = ['Male', 'Female'];
  const [check, setcheck] = useState();
  const [radio, setradio] = useState();

  return (
    <View style={{flexDirection: 'row', margin: 10}}>
      {RadioProps.map((item, index) => {
        return (
          <View key={String(index)} style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{item}</Text>

            <TouchableOpacity
              style={styles.radio}
              onPress={() => {
                setcheck(item), setradio(item);
              }}>
              {check == item && <View style={styles.radiofill}></View>}
            </TouchableOpacity>
          </View>
        );
      })}
      <Text>{radio}</Text>
    </View>
  );
};
export default Radio;

const styles = StyleSheet.create({
  radio: {
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    height: 20,
    margin: 10,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    color: 'black',
  },
  radiofill: {
    borderRadius: 100,
    borderColor: 'black',
    backgroundColor: 'black',
    height: 10,
    margin: 10,
    width: 10,
  },
});
