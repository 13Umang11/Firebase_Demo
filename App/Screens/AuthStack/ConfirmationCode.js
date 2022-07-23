import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import {TextInput} from 'react-native-gesture-handler';
import RNOtpVerify from 'react-native-otp-verify';
import Header from '../../customcomponets/Header';

export default function ConfirmationCode({navigation, route}) {
  // console.log(route);
  const [otp, setotp] = useState('');
  const [confirm, setConfirm] = useState(route.params.confirm);
  const [loading, setloading] = useState(false);
  const [mono, setmono] = useState('+91' + route.params.phone);
  const [time, settime] = useState('00:59');
  let timer = 60;
  let Time = 0;

  const intervalRef = useRef();

  useEffect(() => {
    Timer();
    getHash();
  }, []);

  const getHash = async () => {
    await RNOtpVerify.getHash().then(startListeningForOtp()).catch(console.log);
  };

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(p => {
        if (p) {
          RNOtpVerify.addListener(
            message => {
              console.log('message received from server', message);
              // if (message != null) {
              const otp =
                /(\d{6})/g.exec(message)[1] != {}
                  ? /(\d{6})/g.exec(message)[1]
                  : 0;
              console.log('otp', otp);
              setotp(otp);
              RNOtpVerify.removeListener();
            },
// }
          );
          console.log('setotp', otp);
          console.log(p);
        }
      })
      .catch(p => alert(p));
  };

  // const otpHandler = message => {
  //   console.log(typeof message);
  //   // if (message != null || 0 || '') {
  //     try {
  //       // setTimeout(() => {
  //       const otp1 = /(\d{6})/g.exec(message)[1]
  //         // != {} ? /(\d{6})/g.exec(message)[1] : 0;
  //       console.log('otp',otp);
  //       setotp(otp1);
  //       RNOtpVerify.removeListener();

  //     }, 500);
  //     } catch (r) {
  //       console.log(r);
  //     }

  //    }
  // };

  function Timer() {
    intervalRef.current = setInterval(() => {
      timer = timer - 1;

      var min = Math.floor(timer / 60) < 10
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
  }

  async function confirmCode() {
    setloading(true);

    try {
      const confirmCode = await confirm.confirm(otp);
      setloading(false);
    } catch (error) {
      setloading(false);
      alert(error);
    }
  }

  const SendCode = async () => {
    // setloading(true);
    try {
      const confirmation = await auth()
        .verifyPhoneNumber(mono, 10, true)
        // .signInWithPhoneNumber(mono, true)
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
      // const confirmation = await firebase
      //   .auth()
      //   .verifyPhoneNumber(mono, 20, true)
      //   .on('state_changed', phoneAuthSnapshot => {
      //     Timer();
      //   });
    } catch (e) {
      console.log('Error', e);
      alert(e);
    }
  };

  console.log('otpevearbvaerba', otp);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' && 'padding'}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            keyboardShouldPersistTaps="handled">
            {loading ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator
                  animating={true}
                  style={{alignSelf: 'center'}}
                  size="large"
                />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <Header
                  title="Confirmation Code"
                  show={true}
                  goBack={() => navigation.goBack()}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
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
                      textAlign: 'center',
                    }}>
                    {mono.replace('+91', '+91 ')}
                  </Text>

                  <TextInput
                    style={styles.textinput}
                    placeholder="Confirmation Code"
                    placeholderTextColor={'gray'}
                    keyboardType="phone-pad"
                    onChangeText={setotp}
                    value={otp}
                    autoCorrect={false}
                    maxLength={6}
                  />

                  {/* <OTPInputView
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
          /> */}
                  <TouchableOpacity>
                    <Text
                      style={{
                        margin: 5,
                        alignSelf: 'center',
                        marginTop: '20%',
                      }}>
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
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  textinput: {
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    color: '#000',
    textAlign: 'center',
    fontSize: 22,
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
