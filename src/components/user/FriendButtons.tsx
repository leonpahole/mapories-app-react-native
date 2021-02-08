import React from 'react';
import {Alert, ToastAndroid, View} from 'react-native';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriendship,
  sendFriendRequest,
} from '../../api/friends.api';
import {FriendStatus, UserProfile} from '../../model/UserExcerpt';
import {ColorScheme} from '../../styles/colors';
import {EmptyButton} from '../styled/Buttons';

export type IFriendButtonsProps = {
  user: UserProfile;
  onChange(status: FriendStatus): void;
};

const FriendButtons: React.FC<IFriendButtonsProps> = ({user, onChange}) => {
  const onAddFriendPress = async () => {
    try {
      const friendStatus = await sendFriendRequest(user.id);
      if (friendStatus === FriendStatus.FRIENDS) {
        ToastAndroid.show(
          `You are now friends with ${user.name}!`,
          ToastAndroid.LONG,
        );
      } else {
        ToastAndroid.show(
          `Friend request sent to ${user.name}!`,
          ToastAndroid.LONG,
        );
      }

      onChange(friendStatus);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  const onAcceptRequestPress = async () => {
    try {
      await acceptFriendRequest(user.id);
      ToastAndroid.show(
        `You are now friends with ${user.name}!`,
        ToastAndroid.LONG,
      );
      onChange(FriendStatus.FRIENDS);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  const onCancelRequestPress = async () => {
    try {
      await cancelFriendRequest(user.id);
      ToastAndroid.show(`Friend request cancelled!`, ToastAndroid.LONG);
      onChange(FriendStatus.NONE);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  const onDeclineRequestPress = () => {
    Alert.alert(
      'Decline friend request?',
      'Are you sure you want to decline friend request from ' + user.name + '?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: async () => await onDeclineRequestConfirm()},
      ],
    );
  };

  const onDeclineRequestConfirm = async () => {
    try {
      await declineFriendRequest(user.id);
      ToastAndroid.show(`Friend request declined!`, ToastAndroid.LONG);
      onChange(FriendStatus.NONE);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  const onRemoveFriendPress = () => {
    Alert.alert(
      'Remove friend?',
      'Are you sure you want to remove ' +
        user.name +
        ' from your friend list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: async () => await onRemoveFriendConfirm()},
      ],
    );
  };

  const onRemoveFriendConfirm = async () => {
    try {
      await removeFriendship(user.id);
      ToastAndroid.show(
        `Friend removed. You are now no longer friends with ${user.name}!`,
        ToastAndroid.LONG,
      );
      onChange(FriendStatus.NONE);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  let friendButtons = null;
  if (user.friendStatus === FriendStatus.NONE) {
    friendButtons = (
      <EmptyButton textColor={ColorScheme.success} onPress={onAddFriendPress}>
        Add friend
      </EmptyButton>
    );
  } else if (user.friendStatus === FriendStatus.PENDING_FROM_ME) {
    friendButtons = (
      <EmptyButton textColor={ColorScheme.error} onPress={onCancelRequestPress}>
        Cancel friend request
      </EmptyButton>
    );
  } else if (user.friendStatus === FriendStatus.PENDING_FROM_THEM) {
    friendButtons = (
      <>
        <EmptyButton
          textColor={ColorScheme.success}
          onPress={onAcceptRequestPress}>
          Accept friend request
        </EmptyButton>
        <EmptyButton
          textColor={ColorScheme.error}
          onPress={onDeclineRequestPress}>
          Decline friend request
        </EmptyButton>
      </>
    );
  } else if (user.friendStatus === FriendStatus.FRIENDS) {
    friendButtons = (
      <EmptyButton textColor={ColorScheme.error} onPress={onRemoveFriendPress}>
        Remove friend
      </EmptyButton>
    );
  }

  return <View>{friendButtons}</View>;
};

export {FriendButtons};
