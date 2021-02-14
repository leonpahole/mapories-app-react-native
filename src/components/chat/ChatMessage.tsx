import React from 'react';
import {Text, View} from 'react-native';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {ChatroomMessage} from '../../model/Chat';
import {ColorScheme} from '../../styles/colors';

export type IChatMessageProps = {
  message: ChatroomMessage;
};

const ChatMessage: React.FC<IChatMessageProps> = ({message}) => {
  const loggedInUser = useLoggedInUser();
  let isMine = message.sender.id == loggedInUser?.id;

  let chatBubbleJustifyContent: 'flex-start' | 'flex-end' = 'flex-start';
  let chatBubbleColor = ColorScheme.grayLightOpacity;
  if (isMine) {
    chatBubbleJustifyContent = 'flex-end';
    chatBubbleColor = ColorScheme.primary;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: chatBubbleJustifyContent,
        marginBottom: 8,
      }}>
      <View
        style={{
          justifyContent: 'center',
          maxWidth: '50%',
          padding: 10,
          borderRadius: 20,
          backgroundColor: chatBubbleColor,
        }}>
        <Text style={{color: ColorScheme.white}}>{message.content}</Text>
      </View>
    </View>
  );
};

export {ChatMessage};
