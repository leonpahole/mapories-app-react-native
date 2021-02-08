import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {MapLocation, MarkerData} from '../model/MaporyMapItem';
import {GalleryScreen} from '../screens/common/GalleryScreen';
import {MapScreen} from '../screens/common/MapScreen';
import {GlobalMap} from '../screens/GlobalMap';
import {CreatePost} from '../screens/post/CreatePost';
import {NavigatorScreen} from '../types/navigator';
import {MainTopTabNavigator} from './MainTopTabNavigator';
import {SideStackNavigator} from './SideStackNavigator';

export const RootNavigatorScreens = {
  MainTopTabNavigator: 'MainTopTabNavigator' as const,
  GalleryScreen: 'GalleryScreen' as const,
  MapScreen: 'MapScreen' as const,
  GlobalMap: 'GlobalMap' as const,
  CreatePost: 'CreatePost' as const,
  SideStack: 'SideStack' as const,
};

export type RootNavigatorParamList = {
  [RootNavigatorScreens.MainTopTabNavigator]: undefined;
  [RootNavigatorScreens.GalleryScreen]: {
    imageUris: string[];
  };
  [RootNavigatorScreens.MapScreen]: {
    center: MapLocation;
    markers: MarkerData[];
  };
  [RootNavigatorScreens.GlobalMap]: undefined;
  [RootNavigatorScreens.CreatePost]: undefined;
  [RootNavigatorScreens.SideStack]: undefined;
};

const RootStack = createStackNavigator();

const RootNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof RootNavigatorParamList>[] = [
    {
      name: RootNavigatorScreens.MainTopTabNavigator,
      component: MainTopTabNavigator,
      options: {},
    },
    {
      name: RootNavigatorScreens.GalleryScreen,
      component: GalleryScreen,
      options: {
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    {
      name: RootNavigatorScreens.MapScreen,
      component: MapScreen,
      options: {
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    {
      name: RootNavigatorScreens.GlobalMap,
      component: GlobalMap,
      options: {
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    {
      name: RootNavigatorScreens.CreatePost,
      component: CreatePost,
      options: {
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
    {
      name: RootNavigatorScreens.SideStack,
      component: SideStackNavigator,
      options: {
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
  ];

  return (
    <RootStack.Navigator
      screenOptions={{animationEnabled: false}}
      initialRouteName={RootNavigatorScreens.MainTopTabNavigator}
      headerMode="none"
      mode="modal">
      {screens.map((s, i) => (
        <RootStack.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </RootStack.Navigator>
  );
};

export {RootNavigator};
