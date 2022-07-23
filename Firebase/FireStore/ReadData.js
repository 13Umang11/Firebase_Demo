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
} from 'react-native';
import moment from 'moment';
import {plus1, tick} from '../assets/index';
import firestore from '@react-native-firebase/firestore';

import Header from '../customcomponets/Header';

const {height, width} = Dimensions.get('screen');

export default function ReadData({navigation}) {
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

  const renderItem = ({item, index}) => {
    const data = item._data;
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
        {/* <TouchableOpacity style={{flex: 1}} onPress={() => Edit(item, index)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20, color: 'black'}}>{data.taskTitle}</Text>
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
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text>Create Date : </Text>
            <Text>{moment(data.createdAt).format(' DD/MM/YYYY LTS')}</Text>
          </View>

          {data.updateAt && (
            <View style={{flexDirection: 'row'}}>
              <Text>Update Date : </Text>
              <Text>{moment(data.updateAt).format(' DD/MM/YYYY LTS')}</Text>
            </View>
          )}
          {data.doneAt && (
            <View style={{flexDirection: 'row'}}>
              <Text>Done Date : </Text>
              <Text>{moment(data.doneAt).format(' DD/MM/YYYY LTS')}</Text>
            </View>
          )}
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Tasks List" />
      {/* <View style={{flex: 1}}> */}
      <FlatList data={Data} renderItem={renderItem} />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTasks')}
        style={styles.btnplus}
        activeOpacity={0.5}>
        <Image source={plus1} style={styles.plus} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  plus: {
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
