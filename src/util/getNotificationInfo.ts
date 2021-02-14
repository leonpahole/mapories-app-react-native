import {AppNotification, NotificationType} from '../model/AppNotification';
import {RootNavigatorScreens} from '../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../navigation/SideStackNavigator';

interface NotificationInfo {
  title: string;
  message: string;
  onPress(): void;
}
export const getNotificationInfo = (
  notification: AppNotification,
  navigation: any,
): NotificationInfo | null => {
  let notificationInfo: NotificationInfo | null = null;

  if (notification.type === NotificationType.ACCEPTED_FRIEND_REQUEST) {
    notificationInfo = {
      title: 'Friend request accepted!',
      message: 'has accepted your friend request.',
      onPress: () => {
        navigation.navigate(RootNavigatorScreens.SideStack, {
          screen: SideStackNavigatorScreens.SingleProfileView,
          params: {userId: notification.sender.id},
        });
      },
    };
  } else if (notification.type === NotificationType.SENT_FRIEND_REQUEST) {
    notificationInfo = {
      title: 'New friend request!',
      message: 'has sent you a friend request.',
      onPress: () => {
        navigation.navigate(RootNavigatorScreens.SideStack, {
          screen: SideStackNavigatorScreens.SingleProfileView,
          params: {userId: notification.sender.id},
        });
      },
    };
  } else if (notification.entityId) {
    const onPressPost = () => {
      navigation.navigate(RootNavigatorScreens.SideStack, {
        screen: SideStackNavigatorScreens.SinglePostView,
        params: {postId: notification.entityId},
      });
    };

    if (notification.type === NotificationType.LIKED_YOUR_COMMENT) {
      notificationInfo = {
        title: 'New like on comment!',
        message: 'has liked your comment on a post.',
        onPress: onPressPost,
      };
    } else if (notification.type === NotificationType.LIKED_YOUR_POST) {
      notificationInfo = {
        title: 'New like on post!',
        message: 'has liked your post.',
        onPress: onPressPost,
      };
    } else if (notification.type === NotificationType.COMMENTED_ON_YOUR_POST) {
      notificationInfo = {
        title: 'New comment on post!',
        message: 'has commented your post.',
        onPress: onPressPost,
      };
    } else if (notification.type === NotificationType.REPLIED_TO_YOUR_COMMENT) {
      notificationInfo = {
        title: 'New reply!',
        message: 'has replied to your comment on a post.',
        onPress: onPressPost,
      };
    } else if (
      notification.type === NotificationType.REPLIED_TO_A_COMMENT_YOU_REPLIED_TO
    ) {
      notificationInfo = {
        title: 'New reply!',
        message: 'has replied to a comment your commented on a post.',
        onPress: onPressPost,
      };
    }
  }

  return notificationInfo;
};
