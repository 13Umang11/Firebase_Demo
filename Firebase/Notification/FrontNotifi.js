import React, {useEffect} from 'react';
import {Alert, Button, AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function FrontNotifi() {
  useEffect(() => {
    messaging().requestPermission();
    messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });

    PushNotification.createChannel({
      channelId: '1', // (required)
      channelName: `Authenticationdemo`, // (required)
      channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    });

    PushNotification.configure({
      onNotification: onNotification,
    });

    const unsubscribe = messaging().onMessage(onMessage);
    messaging().getInitialNotification(notificationAction);
    return unsubscribe;
  }, []);

  // useEffect(() => {
  // const background = messaging().setBackgroundMessageHandler(
  //   async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   },
  // );

  //   console.log('background', background);
  // }, []);

  const onMessage = notification => {
    console.log('onMessage', notification, AppState.currentState);
    if (AppState.currentState == 'active') {
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
    }
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

  return <Button title="press" onPress={() => {}}></Button>;
}
