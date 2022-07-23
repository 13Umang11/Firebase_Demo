import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import {call} from '../assets/index';

export default function Forgot({navigation}) {
  const [phone, setphone] = useState('');

  const [loading, setloading] = useState(false);
  // const [code, setCode] = useState('');

  // async function signInWithPhoneNumber(phone) {
  //   const confirmation = await auth()
  //     .signInWithPhoneNumber('+919825107611', true)
  //     .then(data => setConfirm(data));
  // console.log('confirmation', confirmation);
  // setConfirm(confirmation);
  // }

  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  const SendCode = async () => {
    setloading(true);
    const sendCode = '+91' + phone;
    console.log(sendCode);
    const confirmation = await auth()
      .signInWithPhoneNumber(sendCode)
      .then(data => {
        console.log(data);

        if (phone != '') {
          if (phone.length === 10) {
            navigation.navigate('Confirmation', {
              confirm: data,
              phone: phone,
            });
          } else {
            alert('Enter 10 Digits Mobile No');
          }
         
        } else {
          alert('Enter Mobile No');
        }

        setloading(false);
      })
      .catch(e => {
        console.log('error', e);
        alert(e);
        setloading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            style={{alignSelf: 'center'}}
            size="large"
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>Phone Number</Text>

          <Text style={{marginHorizontal: 30, color: '#3248a1'}}>
            Mobile No :
          </Text>
          <TextInput
            style={styles.textinput}
            placeholder="Mobile No"
            keyboardType="phone-pad"
            onChangeText={setphone}
            value={phone}
            autoCorrect={false}
            maxLength={10}
          />

          <TouchableOpacity onPress={SendCode} style={styles.btn}>
            <Text style={styles.btntext}>Send</Text>
          </TouchableOpacity>
          <Pressable
            style={{alignSelf: 'center', margin: 15}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: '#3248a1'}}>Log In With Google?</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 35,
    color: '#3248a1',
    marginBottom: 40,
  },
  textinput: {
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  smpic: {
    height: 32,
    width: 32,
    margin: 10,
    marginTop: 22,
  },
  btn: {
    backgroundColor: '#3248a1',
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 50,
  },
  textmo: {
    borderWidth: 1,
    marginHorizontal: 15,
    alignSelf: 'center',
    marginLeft: 0,
    padding: 10,
    borderRadius: 50,
  },
  btntext: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
// import React, {useState} from 'react';
// import {Button, TextInput} from 'react-native';
// import auth from '@react-native-firebase/auth';

// const Phone = () => {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+91 9825107611')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// };
// export default Phone;
