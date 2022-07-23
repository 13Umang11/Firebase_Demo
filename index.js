/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, {EventType} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async notification => {
  console.log('sdviiksnovdsn', notification);
  console.log('AppState.currentState', AppState.currentState);
  if (AppState.currentState == 'inactive') {
    PushNotification.localNotification({
      channelId: '1',
      priority: 'high',
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
});

// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const {notification, pressAction} = detail;

//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//     // Update external API
//     await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
//       method: 'POST',
//     });

//     // Remove the notification
//     await notifee.cancelNotification(notification.id);
//   }
// });

AppRegistry.registerComponent(appName, () => App);
