import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import {useEffect} from 'react/cjs/react.production.min';

const Viewall = ({navigation, route}) => {
  const [Name, setname] = useState(route.params.Name);
  const [Designation, setdesignation] = useState(route.params.Designation);
  const [Mobile, setmobile] = useState(route.params.Mobile);
  const [Email, setemail] = useState(route.params.Email);
  const [Gender, setgender] = useState(route.params.Gender);
  const [Salary, setsalary] = useState(route.params.Salary);
  const [Data, setData] = useState([
    {
      Name: Name,
      Designation: Designation,
      Mobile: Mobile,
      Email: Email,
      Gender: Gender,
      Salary: Salary,
    },
  ]);

  const Delete = index => {
    // let tempData = Data;
    // tempData = tempData.filter((_, tindex) => index == tindex);
    // setData([...Data]);
    const Ref = firebase
      .app()
      .database('https://projectdemo-14181-default-rtdb.firebaseio.com/')
      .ref('/Employee')
      .remove()

      .then(value => console.log('Data Deleted.', value));
    Navi();
  };

  const Navi = () => {
    navigation.navigate('UpdateScreen', {
      Name: Name,
      Designation: Designation,
      Mobile: Mobile,
      Email: Email,
      Gender: Gender,
      Salary: Salary,
    });
  };
  return (
    <View>
      <FlatList
        data={Data}
        renderItem={(item, index) => (
          <View style={styles.main}>
            <TouchableOpacity onPress={Navi}>
              <Text style={styles.text}>Name :- {Name}</Text>
              <Text style={styles.text}>Mobile No :- {Mobile}</Text>
              <Text style={styles.text}>Gender:- {Gender}</Text>
              <Text style={styles.text}>Email :-{Email} </Text>
              <Text style={styles.text}>Designation :- {Designation}</Text>
              <Text style={styles.text}>Salary :-{Salary}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Delete(index);
              }}>
              <Image
                style={styles.image}
                source={require('./assets/del.webp')}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default Viewall;

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    bottom: 10,
    left: '80%',
  },
  main: {
    marginTop: 20,
    backgroundColor: 'yellow',
    width: '90%',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    marginLeft: 10,
  },
});
//{route.params.Name}
//{route.params.Mobile}
//{route.params.Gender}
//{route.params.Email}
//{route.params.Designation}
// {route.params.Salary}
