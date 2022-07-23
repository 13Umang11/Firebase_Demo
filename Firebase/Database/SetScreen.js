import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';

const SetScreen = ({navigation}) => {
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  const [designation, setdesignation] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [salary, setsalary] = useState(0);

  //Radio
  const RadioProps = ['Male', 'Female'];
  const [check, setcheck] = useState();
  const [radio, setradio] = useState();

  const ADD = () => {
    const newRef = firebase
      .app()
      .database('https://projectdemo-14181-default-rtdb.firebaseio.com/')
      .ref('/Employee')
      .push();

    console.log('Auto generated key: ', newRef.key);

    newRef
      .set({
        id: id,
        Name: name,
        Designation: designation,
        Mobile: mobile,
        Email: email,
        Gender: radio,
        Salary: salary,
      })
      .then(value => console.log('Data set.', value));

    setid(newRef.key);
    console.log(id);
    setTimeout(() => {
      Navi();
    }, 500);
  };

  const Update = () => {
    const Ref = firebase
      .app()
      .database('https://projectdemo-14181-default-rtdb.firebaseio.com/')
      .ref('/Employee')
      .update({
        id: id,
        Name: name,
        Designation: designation,
        Mobile: mobile,
        Email: email,
        Gender: radio,
        Salary: salary,
      })
      .then(() => console.log('Data updated.'));
  };

  const Navi = () => {
    navigation.navigate('Viewall', {
      id: id,
      Name: name,
      Designation: designation,
      Mobile: mobile,
      Email: email,
      Gender: radio,
      Salary: salary,
    });
  };

  //Radio Button

  return (
    <ScrollView style={{flexGrow: 1}}>
      <View>
        <Text style={styles.title}>Employee</Text>
        <View>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.itemInput}
            onChangeText={setname}></TextInput>

          <Text style={styles.text}>Mobile</Text>
          <TextInput
            style={styles.itemInput}
            keyboardType="number-pad"
            onChangeText={text => setmobile(text)}></TextInput>

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
            {/* <Text>{radio}</Text> */}
          </View>

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.itemInput}
            keyboardType="email-address"
            onChangeText={text => setemail(text)}></TextInput>

          <Text style={styles.text}>Designation</Text>
          <TextInput
            style={styles.itemInput}
            onChangeText={text => setdesignation(text)}></TextInput>

          <Text style={styles.text}>Salary</Text>
          <TextInput
            style={styles.itemInput}
            keyboardType="number-pad"
            onChangeText={text => setsalary(text)}></TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            ADD();
          }}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default SetScreen;

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  itemInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    margin: 10,
  },
  text: {
    textAlign: 'left',
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'green',
    width: 120,
    marginTop: 20,
    borderRadius: 50,
  },
  radio: {
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    height: 20,
    margin: 10,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    pressRetentionOffset: {bottom: 30, left: 20, right: 20, top: 20},
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
