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

const UpdateScreen = ({navigation, route}) => {
  const [id, setid] = useState(route.params.id);
  const [Name, setname] = useState(route.params.Name);
  const [Designation, setdesignation] = useState(route.params.Designation);
  const [Mobile, setmobile] = useState(route.params.Mobile);
  const [Email, setemail] = useState(route.params.Email);
  const [Gender, setgender] = useState(route.params.Gender);
  const [Salary, setsalary] = useState(route.params.Salary);

  //Radio
  const RadioProps = ['Male', 'Female'];
  const [check, setcheck] = useState(route.params.Gender);

  const Update = () => {
    const newRef = firebase
      .app()
      .database('https://projectdemo-14181-default-rtdb.firebaseio.com/')
      .ref('/Employee')
      .update({
        id: id,
        Name: Name,
        Designation: Designation,
        Mobile: Mobile,
        Email: Email,
        Gender: Gender,
        Salary: Salary,
      })
      .then(() => console.log('Data updated.'));

    Navi();
  };

  const Navi = () => {
    navigation.navigate('Viewall', {
      id: id,
      Name: Name,
      Designation: Designation,
      Mobile: Mobile,
      Email: Email,
      Gender: Gender,
      Salary: Salary,
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
            onChangeText={text => setname(text)}>
            {Name}
          </TextInput>

          <Text style={styles.text}>Mobile</Text>
          <TextInput
            style={styles.itemInput}
            keyboardType="number-pad"
            onChangeText={text => setmobile(text)}>
            {Mobile}
          </TextInput>

          <View style={{flexDirection: 'row', margin: 10}}>
            {RadioProps.map((item, index) => {
              return (
                <View key={String(index)} style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>{item}</Text>

                  <TouchableOpacity
                    style={styles.radio}
                    onPress={() => {
                      setcheck(item);
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
            onChangeText={text => setemail(text)}>
            {Email}
          </TextInput>

          <Text style={styles.text}>Designation</Text>
          <TextInput
            style={styles.itemInput}
            onChangeText={text => setdesignation(text)}>
            {Designation}
          </TextInput>

          <Text style={styles.text}>Salary</Text>
          <TextInput
            style={styles.itemInput}
            keyboardType="number-pad"
            onChangeText={text => setsalary(text)}>
            {Salary}
          </TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Update();
          }}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default UpdateScreen;

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
