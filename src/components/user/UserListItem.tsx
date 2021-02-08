import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';
import {ChatroomMessage} from '../../model/Chat';
import {UserExcerpt} from '../../model/UserExcerpt';
import {ColorScheme} from '../../styles/colors';
import {UserDisplay} from './UserDisplay';

export type IUserListItemProps = {
  user: UserExcerpt;
  onPress?(): void;
  lastMessage?: ChatroomMessage;
  isChat?: boolean;
};

const UserListItem: React.FC<IUserListItemProps> = ({
  user,
  onPress,
  lastMessage,
  isChat = false,
}) => {
  let chatContent = null;
  if (isChat) {
    if (lastMessage) {
      chatContent = (
        <>
          <Text style={{color: ColorScheme.gray}}>{lastMessage.content}</Text>
          <Text style={{color: ColorScheme.gray}}>
            {dayjs(lastMessage.createdAt).fromNow()}
          </Text>
        </>
      );
    } else {
      chatContent = (
        <Text style={{color: ColorScheme.gray}}>Start a conversation!</Text>
      );
    }
  }

  return (
    <View
      style={{
        backgroundColor: ColorScheme.white,
        padding: 20,
        elevation: 2,
        marginBottom: 10,
      }}>
      <UserDisplay
        userName={user.name}
        onPress={() => {
          onPress && onPress();
        }}
      />
      {chatContent && (
        <View
          style={{
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {chatContent}
        </View>
      )}
    </View>
  );
};

export {UserListItem};
