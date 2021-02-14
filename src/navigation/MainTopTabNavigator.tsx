import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from '../components/Header';
import {ChatOverview} from '../screens/chat/ChatOverview';
import {Profile} from '../screens/Profile';
import {UserSearch} from '../screens/user/UserSearch';
import {ColorScheme} from '../styles/colors';
import {NavigatorScreen} from '../types/navigator';
import {ChatStackNavigator} from './ChatStackNavigator';
import {FeedNavigator} from './FeedNavigator';
import {RootNavigatorScreens} from './RootNavigator';

export const MainTopTabNavigatorScreens = {
  FeedNavigator: 'FeedNavigator' as const,
  GlobalMapPlaceholder: 'GlobalMapPlaceholder' as const,
  UserSearch: 'UserSearch' as const,
  Profile: 'Profile' as const,
  ChatStackNavigator: 'ChatStackNavigator' as const,
};

export type MainTopTabNavigatorParams = {
  [MainTopTabNavigatorScreens.FeedNavigator]: undefined;
  [MainTopTabNavigatorScreens.GlobalMapPlaceholder]: undefined;
  [MainTopTabNavigatorScreens.UserSearch]: undefined;
  [MainTopTabNavigatorScreens.Profile]: undefined;
  [MainTopTabNavigatorScreens.ChatStackNavigator]: undefined;
};

const MainTopTab = createMaterialTopTabNavigator();

const MainTopTabNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof MainTopTabNavigatorParams>[] = [
    {
      name: MainTopTabNavigatorScreens.FeedNavigator,
      component: FeedNavigator,
      options: {
        title: 'Feed',
        tabBarIcon: ({color}: any) => (
          <Icon name="home" size={20} color={color} />
        ),
        tabBarVisible: false,
      },
    },
    {
      name: MainTopTabNavigatorScreens.GlobalMapPlaceholder,
      component: View,
      options: {
        title: 'GlobalMap',
        tabBarIcon: ({color}: any) => (
          <Icon name="map" size={20} color={color} />
        ),
      },
      listeners: ({navigation}: any) => ({
        tabPress: (e: any) => {
          e.preventDefault();
          navigation.navigate(RootNavigatorScreens.GlobalMap);
        },
      }),
    },
    {
      name: MainTopTabNavigatorScreens.UserSearch,
      component: UserSearch,
      options: {
        title: 'UserSearch',
        tabBarIcon: ({color}: any) => (
          <Icon name="search" size={20} color={color} />
        ),
      },
    },
    {
      name: MainTopTabNavigatorScreens.Profile,
      component: Profile,
      options: {
        title: 'Profile',
        tabBarIcon: ({color}: any) => (
          <Icon name="user" size={20} color={color} />
        ),
      },
    },
    {
      name: MainTopTabNavigatorScreens.ChatStackNavigator,
      component: ChatStackNavigator,
      options: {
        title: 'ChatStackNavigator',
        tabBarIcon: ({color}: any) => (
          <Icon name="comment" size={20} color={color} />
        ),
      },
    },
  ];

  return (
    <>
      <Header />
      <MainTopTab.Navigator
        initialRouteName={MainTopTabNavigatorScreens.FeedNavigator}
        tabBarOptions={{
          activeTintColor: ColorScheme.primary,
          showIcon: true,
          showLabel: false,
          indicatorStyle: {
            backgroundColor: ColorScheme.primary,
          },
          style: {
            backgroundColor: ColorScheme.white,
            elevation: 0,
            shadowColor: 'black',
            borderBottomWidth: 1,
            borderBottomColor: ColorScheme.grayLight,
          },
        }}
        swipeEnabled={false}>
        {screens.map((s, i) => (
          <MainTopTab.Screen
            key={i}
            name={s.name}
            component={s.component}
            options={() => s.options}
            listeners={s.listeners}
          />
        ))}
      </MainTopTab.Navigator>
    </>
  );
};

export {MainTopTabNavigator};
