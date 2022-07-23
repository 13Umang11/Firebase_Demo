import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {otp} from '../assets';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const {height, width} = Dimensions.get('screen');

export default function ConfirmationCode({navigation, route}) {
  const [Code, setCode] = useState(0);
  // console.log(route);
  const [confirm, setConfirm] = useState(route.params.confirm);
  const [loading, setloading] = useState(false);
  const [mono, setmono] = useState('+91' + route.params.phone);
  const [time, settime] = useState('00:59');
  const [resend, setresend] = useState(false);
  const [count, setcount] = useState(0);
  // var seconds = 60;
  let Time = 0;
  let timer = 60;

  const intervalRef = useRef();

  useEffect(() => {
    Timer();
  }, []);

  const Timer = () => {
    intervalRef.current = setInterval(() => {
      timer = timer - 1;

      var min =
        Math.floor(timer / 60) < 10
          ? '0' + Math.floor(timer / 60)
          : Math.floor(timer / 60);
      var sec = ('0' + Math.floor(timer % 60)).slice(-2);
      Time = min + ':' + sec;

      if (timer >= 0) {
        settime(Time);
      } else {
        clearInterval(intervalRef.current);
        // setresend(false);
      }
    }, 1000);
  };

  async function confirmCode() {
    try {
      // settext1('We set it to your number  ' + mono);
      await confirm.confirm(Code);
      Alert.alert('Welcome', 'Login Successful ', [
        {
          text: 'Cancal',
          style: 'cancel',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.log('Invalid code.', error);
      alert(error);
    }
  }

  const SendCode = async () => {
    setloading(true);
    const sendCode = mono;
    console.log(sendCode);
    const confirmation = await auth()
      .signInWithPhoneNumber(sendCode)
      .then(data => {
        setConfirm(data);
        Timer();
        setloading(false);
      })
      .catch(e => {
        console.log('error', e);
        alert(e);
        setloading(false);
      });
  };

  return (
    <View>
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
          <Text style={styles.text}>Phone Number</Text>
          {/* <Text
        style={{
          padding: 10,
          color: '#fff',
          fontSize: 18,
        }}>
        {text1}
      </Text> */}

          <Text
            style={{
              padding: 10,
              color: '#371873',
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 15,
            }}>
            {mono}
          </Text>
          <OTPInputView
            style={{width: '90%', height: 50, margin: 10, alignSelf: 'center'}}
            pinCount={6}
            codeInputFieldStyle={styles.underlineStyleBase}
            placeholderCharacter="#"
            autoFocusOnLoad={false}
            // secureTextEntry={true}
            keyboardType="number-pad"
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={Pin => {
              setCode(Pin);
              // setPin(Pin);
            }}
          />
          <TouchableOpacity>
            <Text style={{margin: 5, alignSelf: 'center', marginTop: '20%'}}>
              If You Didn't get an OTP then Click
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={time == '00:00' ? false : true}
            style={{
              backgroundColor: '#371873',
              textAlign: 'center',
              padding: 15,
              margin: 10,
              borderRadius: 50,
              opacity: time == '00:00' ? 1 : 0.5,
            }}
            onPress={SendCode}>
            <Text style={styles.btntext}>
              {time == '00:00' ? 'Get Code' : time}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={confirmCode}>
            <Text style={styles.btntext}> Next </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#4259E0',
    borderBottomWidth: 4,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderRadius: 20,
    // borderBottomColor: '#4259E0',
    color: '#4259E0',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  underlineStyleHighLighted: {
    // borderBottomColor: '#4259E0',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#371873',
    padding: 10,
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#371873',
    textAlign: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 50,
  },
  btntext: {
    color: '#fff',
    alignSelf: 'center',
  },
});
