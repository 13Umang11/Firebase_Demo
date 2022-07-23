import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {plus1, tick, trash} from '../../../assets/index';
import firestore from '@react-native-firebase/firestore';

import Header from '../../../customcomponets/Header';

const {height, width} = Dimensions.get('screen');

export default function ReadData({navigation, route}) {
  const [Data, setData] = useState([]);
  //   const isfocused = useIsFocused();
  useEffect(() => {
    firestoreData();
  }, []);

  const firestoreData = () => {
    firestore()
      .collection('ToDoTasks')
      .onSnapshot(
        snap => {
          console.log(snap.docs);
          setData(snap.docs);
        },
        // snap.docs.forEach((item, index) => {
        //   console.log(item._data);
        // }),
      );
  };

  const Edit = (item, index) => {
    navigation.navigate('AddTasks', {item: item});
  };

  const Warning = data => {
    Alert.alert('Alert', 'Are You Sure You Want To Delete This Task', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancal'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => Delete(data)},
    ]);
  };

  const Delete = data => {
    console.log('dtaadvkjhkjhjvhdfbdfj', data);
    firestore()
      .collection('ToDoTasks')
      .doc(`${data.taskID}`)
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

  const renderItem = ({item, index}) => {
    const data = item._data;
    console.log(data);
    // console.log(JSON.stringify(data.createdAt));
    return (
      <View
        key={index}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginBottom: 10,
          justifyContent: 'space-between',
          padding: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            if (data.status === 'DONE') {
              if (Platform.OS === 'android') {
                ToastAndroid.show('This Task Already Done', ToastAndroid.SHORT);
                Alert.alert('Warning', 'This Task Already Done! Are You Sure You Want To Update This Task', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancal'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => Edit(item, index)},
                ]);
              } else {
                Toast.show('This Task Already Done', Toast.SHORT, [
                  'UIAlertController',
                ]);
                Alert.alert('Warning', 'This Task Already Done! Are You Sure You Want To Update This Task', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancal'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => Edit(item, index)},
                ]);
              }
            } else {
              Edit(item, index);
            }
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textDecorationLine:
                  data.status === 'DONE' ? 'line-through' : 'none',
              }}>
              {data.taskTitle}
            </Text>
            {data.status === 'DONE' ? (
              <Image
                source={tick}
                style={{
                  height: 20,
                  width: 20,
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
              />
            ) : (
              <Text
                style={{color: data.status === 'PENDING' ? 'red' : 'green'}}>
                {data.status}
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text>Create Date : </Text>
                <Text>{moment(data.createdAt).format(' DD/MM/YYYY LTS')}</Text>
              </View>

              {data.status === 'INPROGESS' && (
                <View style={{flexDirection: 'row'}}>
                  <Text>In Progress: </Text>
                  <Text>{moment(data.updateAt).format(' DD/MM/YYYY LTS')}</Text>
                </View>
              )}
              {data.status === 'DONE' && (
                <View style={{flexDirection: 'row'}}>
                  <Text>Done Date : </Text>
                  <Text>{moment(data.doneAt).format(' DD/MM/YYYY LTS')}</Text>
                </View>
              )}
            </View>
            {data.status === 'DONE' && (
              <TouchableOpacity onPress={() => Warning(data)}>
                <Image
                  source={trash}
                  style={{
                    height: 30,
                    width: 30,
                    marginHorizontal: 5,
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header title="Tasks List"  
        show={true}
        goBack={() => navigation.goBack()}
      /> 
        {/* <View style={{flex: 1}}> */}
        <FlatList data={Data} renderItem={renderItem} />

        <TouchableOpacity
          onPress={() => navigation.navigate('AddTasks')}
          style={styles.btnplus}
          activeOpacity={0.5}>
          <Image source={plus1} style={styles.plus} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  plus: {
    backgroundColor: 'white',
    borderRadius: 100,
    height: 55,
    width: 55,
    tintColor: '#007ACC',
  },
  btnplus: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  edit: {
    height: 35,
    width: 35,
    margin: 10,
  },
});
