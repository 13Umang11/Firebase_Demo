import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  SplashScreen.hide();
  const Click = async () => {
    console.log('click');
    const appInstanceId = await analytics().getAppInstanceId();
    const logAppOpen = await analytics().logAppOpen();
    const ana = await analytics().logEvent('basket', {
      id: 3745092,
      item: 'mens grey t-shirt',
      description: ['ronded', 'long sleeved'],
      size: 'L',
    });
    console.log('ana', ana);
  };

  return (
    <View>
      <Button
        title="Basket"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={() => Click()}
      />
    </View>
  );
}
