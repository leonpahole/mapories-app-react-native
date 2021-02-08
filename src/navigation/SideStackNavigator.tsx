import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SinglePostView} from '../screens/sideStack/SinglePostView';
import {SingleProfileView} from '../screens/sideStack/SingleProfileView';
import {NavigatorScreen} from '../types/navigator';
import {horizontalCardStyleInterpolator} from '../util/cardStyleInterpolators';

export const SideStackNavigatorScreens = {
  SinglePostView: 'SinglePostView' as const,
  SingleProfileView: 'SingleProfileView' as const,
};

export type SideStackNavigatorParamList = {
  [SideStackNavigatorScreens.SinglePostView]: {
    postId: string;
    onLikeStatusChange(id: string, status: boolean): void;
  };
  [SideStackNavigatorScreens.SingleProfileView]: {userId: string};
};

const SideStack = createStackNavigator();

const SideStackNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof SideStackNavigatorParamList>[] = [
    {
      name: SideStackNavigatorScreens.SinglePostView,
      component: SinglePostView,
      options: {
        title: '',
        cardStyleInterpolator: horizontalCardStyleInterpolator,
      },
    },
    {
      name: SideStackNavigatorScreens.SingleProfileView,
      component: SingleProfileView,
      options: {
        title: '',
        cardStyleInterpolator: horizontalCardStyleInterpolator,
      },
    },
  ];

  return (
    <SideStack.Navigator>
      {screens.map((s, i) => (
        <SideStack.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </SideStack.Navigator>
  );
};

export {SideStackNavigator};
