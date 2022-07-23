import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import notifee, {EventType, AndroidStyle} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';

export default function LocalNotification() {
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);

    messaging()
      .getToken()
      .then(token => {
        firestore().collection('UserToken').doc(`hello`).set({
          userID: 'sdvsdv',
          token: token,
          // doneAt: '',
        });
      });

    PushNotification.createChannel({
      channelId: '1', // (required)
      channelName: 'AuthenticationDemo', // (required)
      channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`,
      vibrate: true,
    });

    PushNotification.configure({
      onNotification: onNotification,
    });
    return unsubscribe;
  }, []);

  const onMessage = notification => {
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

  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        sound: 'default',
        // smallIcon: 'ic_lancher_round.png', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  const Modal = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Authentication Demo</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  };

  const Replyable = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Authentication Demo</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        autoCancel: false,
        showChronometer: true,
        actions: [
          {
            title:
              '<p style="color: #f44336;"><b>Mark As Read</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
          {
            title: '<b>Replay</b> &#128111;',
            pressAction: {id: 'dance'},
            input: true,
          },
        ],
      },
    });
  };

  const Timer = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title: 'Message from Sarah Lane',
      body: 'Tap to view your unread message from Sarah.',
      subtitle: 'Messages',
      android: {
        channelId,
        largeIcon: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
        timestamp: Date.now(),
        showTimestamp: true,
        badgeCount: 2,
        ticker: 'sdkjvsdjovb',
        color: 'red',
        timeoutAfter: 4000,

        circularLargeIcon: true,
        ongoing: true,
        showChronometer: true,
      },
    });
  };

  const Delay = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title: 'Local Notification',
      body: 'This Message From Authentication Demo',
      subtitle: 'Messages',
      android: {
        channelId,
        largeIcon:
          'https://w7.pngwing.com/pngs/359/1024/png-transparent-firebase-cloud-messaging-computer-icons-google-cloud-messaging-android-angle-triangle-computer-programming.png',
        timestamp: Date.now() - 480000,
        showTimestamp: true,
        pressAction: {
          id: 'default',
          mainComponent: 'custom-component',
        },
      },
    });
  };

  const Progress = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title: 'Local Notification',
      body: 'This Message From Authentication Demo',
      subtitle: 'Messages',
      android: {
        channelId,
        progress: {
          max: 10,
          current: 4,
        },
      },
    });
  };

  const BigPic = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default ',
    });

    await notifee.displayNotification({
      title: 'Image uploaded',
      body: 'Your image has been successfully uploaded',
      android: {
        channelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80',
        },
      },
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity onPress={onDisplayNotification} style={styles.btn}>
        <Text style={styles.btntext}>Display Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Modal} style={styles.btn}>
        <Text style={styles.btntext}>Styleable Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Replyable} style={styles.btn}>
        <Text style={styles.btntext}>Reply able Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Timer} style={styles.btn}>
        <Text style={styles.btntext}>Small Image & Sub Title Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Delay} style={styles.btn}>
        <Text style={styles.btntext}>Delay Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Progress} style={styles.btn}>
        <Text style={styles.btntext}>Progress Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={BigPic} style={styles.btn}>
        <Text style={styles.btntext}>Big Image Notification</Text>
      </TouchableOpacity>
    </View>
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
