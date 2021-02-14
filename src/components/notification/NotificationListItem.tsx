import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {AppNotification} from '../../model/AppNotification';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../../navigation/SideStackNavigator';
import {ColorScheme} from '../../styles/colors';
import {getNotificationInfo} from '../../util/getNotificationInfo';
import {Avatar} from '../common/Avatar';

export type INotificationListItemProps = {
  notification: AppNotification;
};

const NotificationListItem: React.FC<INotificationListItemProps> = ({
  notification,
}) => {
  const navigation = useNavigation();
  const notificationInfo = getNotificationInfo(notification, navigation);
  if (!notificationInfo) {
    return null;
  }

  const onSenderPress = () => {
    navigation.navigate(RootNavigatorScreens.SideStack, {
      screen: SideStackNavigatorScreens.SingleProfileView,
      params: {userId: notification.sender.id},
    });
  };

  return (
    <View
      style={{
        backgroundColor: ColorScheme.white,
        padding: 20,
        elevation: 2,
        marginBottom: 10,
        flexDirection: 'row',
      }}>
      <TouchableWithoutFeedback onPress={onSenderPress}>
        <View style={{marginRight: 14}}>
          <Avatar source={require('../../assets/defaultUser.jpg')} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', marginBottom: 3}}>
          {notificationInfo.title}
        </Text>
        <Text>
          <TouchableWithoutFeedback onPress={onSenderPress}>
            <Text style={{fontWeight: 'bold'}}>{notification.sender.name}</Text>
          </TouchableWithoutFeedback>{' '}
          <TouchableWithoutFeedback onPress={notificationInfo.onPress}>
            <Text>{notificationInfo.message}</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
  );
};

export {NotificationListItem};
