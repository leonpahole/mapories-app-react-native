import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotificationService {
  constructor(onNotification: (p: any) => void) {
    this.createDefaultChannels();

    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: `Default channel`,
        soundName: 'default',
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  sendLocalNotification(
    title: string,
    message: string,
    tag?: string,
    userInfo?: any,
  ) {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      vibrate: true,
      vibration: 300,
      invokeApp: true,
      tag,
      title,
      message,
      userInfo,
    });
  }
}
