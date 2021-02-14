import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import {subscribeToMobilePush} from '../api/user.api';

class NotificationHandler {
  _onNotification: ((p: any) => void) | null = null;

  onNotification(notification: any) {
    if (this._onNotification) {
      this._onNotification(notification);
    }
  }

  async onRegister(token: {os: string; token: string}): Promise<void> {
    try {
      await subscribeToMobilePush(token.token);
    } catch (e) {
      console.log('Could not subscribe to mobile push');
      console.log(e);
    }
  }

  onRegistrationError(error: any) {
    console.log('Mobile push registration error:', error);
  }

  attachNotification(handler: (p: any) => void) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),
  onNotification: handler.onNotification.bind(handler),
  onRegistrationError: handler.onRegistrationError.bind(handler),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default handler;
