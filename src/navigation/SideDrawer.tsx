import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {NavigatorScreen} from '../types/navigator';
import {NotificationCenter} from '../screens/notification/NotificationCenter';
import {RootNavigator} from './RootNavigator';
import {View, Text, Image, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Header} from '../components/Header';
import {ColorScheme} from '../styles/colors';
import {useLoggedInUser} from '../hooks/useLoggedInUser';
import {Logo} from '../components/Logo';
import {onLogout} from '../api/auth.api';
import {useDispatch} from 'react-redux';

export const SideDrawerScreens = {
  RootNavigator: 'RootNavigator' as const,
  NotificationCenter: 'NotificationCenter' as const,
};

export type SideDrawerParamList = {
  [SideDrawerScreens.RootNavigator]: undefined;
  [SideDrawerScreens.NotificationCenter]: undefined;
};

const SideDrawer = createDrawerNavigator();

export default function App() {
  const loggedInUser = useLoggedInUser();
  const dispatch = useDispatch();

  const screens: NavigatorScreen<keyof SideDrawerParamList>[] = [
    {
      name: SideDrawerScreens.RootNavigator,
      component: RootNavigator,
      options: {
        title: 'Home',
      },
    },
    {
      name: SideDrawerScreens.NotificationCenter,
      component: NotificationCenter,
      options: {
        title: 'Notifications',
      },
    },
  ];

  return (
    <SideDrawer.Navigator
      initialRouteName={SideDrawerScreens.RootNavigator}
      drawerPosition={'right'}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View
            style={{
              backgroundColor: ColorScheme.white,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderBottomColor: ColorScheme.grayLight,
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Logo />
            <Text style={{marginTop: 10, color: ColorScheme.gray}}>
              Hello, {loggedInUser?.name}
            </Text>
          </View>
          <DrawerItemList {...props} />
          <DrawerItem
            label="About the author"
            onPress={() => Linking.openURL('https://www.leonpahole.com')}
          />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await onLogout(dispatch);
            }}
          />
        </DrawerContentScrollView>
      )}>
      {screens.map((s, i) => (
        <SideDrawer.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </SideDrawer.Navigator>
  );
}
