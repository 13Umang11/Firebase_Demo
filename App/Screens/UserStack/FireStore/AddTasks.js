import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../customcomponets/Header';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

export default function AddTasks({navigation, route}) {
  const RadioPops = ['PENDING', 'INPROGESS', 'DONE'];
  const [status, setstatus] = useState('PENDING');
  const [title, settitle] = useState('');
  const [descripition, setDescripition] = useState('');
  const [header, setheader] = useState('ADD Tasks');
  const [TaskID, setTaskID] = useState('');

  const Status = item => {
    setstatus(item);
  };

  useEffect(() => {
    if (route.params) {
      setheader('Edit Tasks');
      console.log(route);
      console.log(route.params.item._data);
      const items = route.params.item._data;
      settitle(items.taskTitle);
      setDescripition(items.descripition);
      setstatus(items.status);
      // setitem(items);
    }
  }, []);

  const ADD = async () => {
    if (title) {
      if (descripition) {
        var ID = +new Date();
        firestore()
          .collection('ToDoTasks')
          .doc(`${ID}`)
          .set({
            taskTitle: title,
            status: status,
            descripition: descripition,
            createdAt: moment().toISOString(),
            taskID: ID,
            // doneAt: '',
          })
          .then(() => {
            console.log('User added!');
          });
        navigation.navigate('ReadData');
      } else {
        alert('Enter Task Descripition');
      }
    } else {
      alert('Enter Task Title');
    }
  };

  const Edit = () => {
    const edit = route.params.item._data;
    if (title) {
      if (descripition) {
        if (status === 'DONE') {
          firestore()
            .collection('ToDoTasks')
            .doc(`${edit.taskID}`)
            .update({
              taskTitle: title,
              status: status,
              descripition: descripition,
              doneAt: moment().toISOString(),
            })
            .then(() => {
              console.log('User Updated!');
            });
          navigation.navigate('ReadData');
        } else if (status === 'INPROGESS') {
          firestore()
            .collection('ToDoTasks')
            .doc(`${edit.taskID}`)
            .update({
              taskTitle: title,
              status: status,
              descripition: descripition,
              updateAt: moment().toISOString(),
            })
            .then(() => {
              console.log('User Updated!');
            });
          navigation.navigate('ReadData');
        } else {
          firestore()
            .collection('ToDoTasks')
            .doc(`${edit.taskID}`)
            .update({
              taskTitle: title,
              status: status,
              descripition: descripition,
            })
            .then(() => {
              console.log('User Updated!');
            });
          navigation.navigate('ReadData');
        }
      } else {
        alert('Enter Task Descripition');
      }
    } else {
      alert('Enter Task Title');
    }
  };

  const Warning = () => {
    Alert.alert('Alert', 'Are You Sure You Want To Delete This Task', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancal'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => Delete()},
    ]);
  };

  const Delete = () => {
    const del = route.params.item._data;
    firestore()
      .collection('ToDoTasks')
      .doc(`${del.taskID}`)
      .delete()
      .then(() => {
        console.log('User Deleted!');
        navigation.navigate('ReadData');
        if (Platform.OS === 'android') {
          ToastAndroid.show('Task Delete Successfully', ToastAndroid.SHORT);
        } else {
          Toast.show('Task Delete Successfully', Toast.SHORT, [
            'UIAlertController',
          ]);
        }
      });
  };

  const Cancal = () => {
    navigation.navigate('ReadData');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header title={header} show={true} goBack={() => navigation.goBack()} />
        <ScrollView style={{flexGrow: 1}} keyboardShouldPersistTaps="always">
          <Text style={styles.title}>Task Title :</Text>
          <TextInput
            style={styles.textinput}
            autoCapitalize="words"
            placeholder="Enter Task Title"
            onChangeText={settitle}
            value={title}
          />

          <Text style={styles.title}>Task Descripition :</Text>
          <TextInput
            style={{...styles.textinput, borderRadius: 10, height: 120}}
            multiline={true}
            placeholder="Enter Task Descripition"
            onChangeText={setDescripition}
            value={descripition}
          />

          <Text style={styles.title}>Status :</Text>

          {RadioPops.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.radioView}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{flexDirection: 'row'}}
                    onPress={() => Status(item)}>
                    <View style={styles.uncheckRadio}>
                      {status === item && <View style={styles.check} />}
                    </View>
                    <Text style={styles.radioText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={Cancal} style={styles.btn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={route.params ? Edit : ADD}
              style={styles.btn}>
              <Text style={styles.btnText}>
                {route.params ? 'SAVE' : 'ADD'}
              </Text>
            </TouchableOpacity>
          </View>
          {route.params && (
            <TouchableOpacity
              onPress={Warning}
              style={{
                marginHorizontal: 25,
                marginVertical: 10,
                backgroundColor: 'red',
                borderRadius: 50,
                elevation: 4,
              }}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 16,
  },
  textinput: {
    marginHorizontal: 15,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 15,
  },
  radioView: {
    flexDirection: 'row',
  },
  radioText: {
    margin: 10,
    fontSize: 18,
    color: 'black',
  },
  uncheckRadio: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#371873',
    height: 25,
    marginTop: 10,
    width: 25,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  check: {
    backgroundColor: '#371873',
    height: 15,
    width: 15,
    borderRadius: 100,
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#371873',
    width: 140,
    borderRadius: 50,
    elevation: 4,
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 19,
    color: '#fff',
    fontWeight: '600',
  },
});
