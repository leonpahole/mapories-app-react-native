import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Feed} from '../screens/Feed';
import {NavigatorScreen} from '../types/navigator';

export const FeedNavigatorScreens = {
  Feed: 'Feed' as const,
};

export type FeedNavigatorParamList = {
  [FeedNavigatorScreens.Feed]: undefined;
};

const FeedStack = createStackNavigator();

const FeedNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof FeedNavigatorParamList>[] = [
    {
      name: FeedNavigatorScreens.Feed,
      component: Feed,
      options: {
        title: '',
      },
    },
  ];

  return (
    <FeedStack.Navigator
      initialRouteName={FeedNavigatorScreens.Feed}
      headerMode={'none'}>
      {screens.map((s, i) => (
        <FeedStack.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </FeedStack.Navigator>
  );
};

export {FeedNavigator};
