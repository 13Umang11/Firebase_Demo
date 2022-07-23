import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import analytics, {firebase} from '@react-native-firebase/analytics';
import Header from '../../../customcomponets/Header';

export default function Analytics({navigation}) {
  const defaultAppAnalytics = firebase.analytics();
  const Order = async () => {
    console.log('click');
    const appInstanceId = await analytics().getAppInstanceId();
    console.log(appInstanceId);
    const logAppOpen = await analytics().logAppOpen();
    console.log(logAppOpen);
    const ana = await analytics().logEvent('PlaceOrder', {
      id: 3567567879,
      item: 'mens grey tsddbfdb-shirt',
      description: ['ronded', 'long sleeved'],
      size: 'L',
    });
  };

  const PayMentInfo = async () => {
    const appInstanceId = await analytics().getAppInstanceId();
    console.log(appInstanceId);
    const UserInfo = await analytics().logAddPaymentInfo({
      item: 'mens grey tsddbfdb-shirt',
      value: 50,
      currency: 'USD',
      payment_type: 'Online',
    });
    console.log('UserInfo', UserInfo);
  };

  const addCart = async () => {
    const Items = await analytics().logAddToCart({
      item: 'mens grey tsddbfdb-shirt',
      value: 50,
      currency: 'USD',
    });
  };

  const viewCart = async () => {
    const Items = await analytics().logViewCart({
      items: ['mens grey tsddbfdb-shirt', 'Shoes', 'Caps'],
      value: 50,
      currency: 'USD',
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          title="Analytics"
          show={true}
          goBack={() => navigation.goBack()}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={Order} style={styles.btn}>
            <Text style={styles.btntext}>Place Order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={PayMentInfo} style={styles.btn}>
            <Text style={styles.btntext}>Payment Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addCart} style={styles.btn}>
            <Text style={styles.btntext}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={viewCart} style={styles.btn}>
            <Text style={styles.btntext}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3248a1',
    marginHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
  },

  btntext: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
