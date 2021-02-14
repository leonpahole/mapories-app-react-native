import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ChatOverview} from '../screens/chat/ChatOverview';
import {ChatPM} from '../screens/chat/ChatPM';
import {NavigatorScreen} from '../types/navigator';
import {horizontalCardStyleInterpolator} from '../util/cardStyleInterpolators';

export const ChatStackNavigatorScreens = {
  ChatOverview: 'ChatOverview' as const,
  ChatPM: 'ChatPM' as const,
};

export type ChatStackNavigatorParamList = {
  [ChatStackNavigatorScreens.ChatOverview]: undefined;
  [ChatStackNavigatorScreens.ChatPM]: {chatroomId: string};
};

const ChatStack = createStackNavigator();

const ChatStackNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof ChatStackNavigatorParamList>[] = [
    {
      name: ChatStackNavigatorScreens.ChatOverview,
      component: ChatOverview,
      options: {
        title: '',
        cardStyleInterpolator: horizontalCardStyleInterpolator,
      },
    },
    {
      name: ChatStackNavigatorScreens.ChatPM,
      component: ChatPM,
      options: {
        title: '',
        cardStyleInterpolator: horizontalCardStyleInterpolator,
      },
    },
  ];

  return (
    <ChatStack.Navigator headerMode={'none'}>
      {screens.map((s, i) => (
        <ChatStack.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </ChatStack.Navigator>
  );
};

export {ChatStackNavigator};
