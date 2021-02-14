import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {ChatroomMessage} from '../../model/Chat';
import {UserExcerpt} from '../../model/UserExcerpt';
import {ColorScheme} from '../../styles/colors';
import {fromNowText} from '../../util/dateUtil';
import {UserDisplay} from './UserDisplay';

export type IUserListItemProps = {
  user: UserExcerpt;
  onPress?(): void;
  lastMessage?: ChatroomMessage | null;
  isNewChat?: boolean;
  isChat?: boolean;
};

const UserListItem: React.FC<IUserListItemProps> = ({
  user,
  onPress,
  lastMessage,
  isChat = false,
  isNewChat = false,
}) => {
  let chatContent = null;
  if (isChat) {
    if (lastMessage) {
      chatContent = (
        <>
          <Text
            style={{
              color: ColorScheme.gray,
              fontWeight: isNewChat ? 'bold' : 'normal',
            }}>
            {lastMessage.content}
          </Text>
          <Text
            style={{
              color: ColorScheme.gray,
              fontWeight: isNewChat ? 'bold' : 'normal',
            }}>
            {fromNowText(lastMessage.createdAt)}
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
    <TouchableWithoutFeedback
      onPress={() => {
        onPress && onPress();
      }}>
      <View
        style={{
          backgroundColor: ColorScheme.white,
          padding: 20,
          elevation: 2,
          marginBottom: 10,
        }}>
        <UserDisplay userName={user.name} />
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
    </TouchableWithoutFeedback>
  );
};

export {UserListItem};
