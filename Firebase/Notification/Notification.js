import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  AppState,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
// const admin = require('firebase-admin');

export default function Notification(params) {
  // const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);

    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });

    PushNotification.createChannel({
      channelId: '1', // (required)
      channelName: 'AuthenticationDemo', // (required)
      channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });

    PushNotification.configure({
      onNotification: onNotification,
    });
    return unsubscribe;
  }, []);

  const onMessage = notification => {
    // console.log('onMessage', notification, AppState.currentState);
    // if (AppState.currentState == 'active' ) {
    PushNotification.localNotification({
      channelId: '1',
      title: notification.notification?.title || notification?.data.title,

      message: notification.notification?.body || notification?.data.message,
      bigPictureUrl:
        notification.notification?.android.imageUrl ||
        notification?.android.imageUrl,

      largeIconUrl:
        notification.notification?.android.imageUrl ||
        notification?.android.imageUrl,
      userInfo: notification?.data || {},
    });
    // }
  };

  const onNotification = notification => {
    console.log('onNotification', notification);
    if (
      notification.userInteraction ||
      notification?.data?.userInteraction === 1
    ) {
      console.log('Message clicked', notification);
      notificationAction(notification);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  };

  const notificationAction = notification => {
    console.log('notificationAction', notification);
    if (notification) {
      const data = notification.data;
      const type = notification.data?.type || 'notification';
      if (type === 'notification') {
        // navigation.navigate('NotificationScreen');
      } else if (type === 'post') {
        // navigation.navigate('Comments', {data: data});
      } else if (type === 'group') {
        // navigation.push('GroupProfile', { isMember: false, isCreateByMe: parseInt(data.created_user_id) === parseInt(userInfo.id), data: data, fromList: true })
        // navigation.navigate('NotificationScreen');
      }
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // admin
      //   .messaging()
      //   .send(message)
      //   .then(response => {
      //     console.log('Successfully sent message:', response);
      //   })
      //   .catch(error => {
      //     console.log('Error sending message:', error);
      //   });
    }
  }

  return (
    <View>
      <Text>thrtnrtnxrtn</Text>
      <Button
        title="Instant Notification"
        onPress={() => requestUserPermission()}
      />
    </View>
  );
}
