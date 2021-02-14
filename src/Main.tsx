import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {authTokenKey, getMe} from './api/auth.api';
import {useLoggedInUser} from './hooks/useLoggedInUser';
import {AuthNavigator} from './navigation/AuthNavigator';
import {RootNavigator} from './navigation/RootNavigator';
import {loginAction} from './redux/auth/auth.actions';
import {SplashScreen} from './screens/SplashScreen';
import NotificationService from './push/NotificationService';
import {ChatStackNavigatorScreens} from './navigation/ChatStackNavigator';
import {navigate, navigationRef} from './navigation/RootNavigation';
import SideDrawer from './navigation/SideDrawer';

LogBox.ignoreLogs(['Require cycle:']);

const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const loggedInUser = useLoggedInUser();
  const dispatch = useDispatch();

  const notificationService = new NotificationService((p) => {
    if (p.userInteraction) {
      if (!p.data) {
        return;
      }

      if (p.data.type === 'chat' && p.data.chatroomId) {
        navigate(ChatStackNavigatorScreens.ChatPM, {
          chatroomId: p.data.chatroomId,
        });
      }
    } else {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      if (currentRoute) {
        if (p.data && p.data.type === 'chat' && p.data.chatroomId) {
          if (
            currentRoute.name === ChatStackNavigatorScreens.ChatPM &&
            currentRoute.params &&
            (currentRoute.params as any).chatroomId === p.data.chatroomId
          ) {
            return;
          }
        }
      }
      notificationService.sendLocalNotification(
        p.title,
        p.message,
        p.tag,
        p.data,
      );
    }
  });

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const me = await getMe();
        dispatch(loginAction(me, (await AsyncStorage.getItem(authTokenKey))!));
      } catch (e) {
        console.log('No logged in user!');
        console.log(e);
        await AsyncStorage.clear();
      }

      setLoading(false);
    }

    fetchLoggedInUser();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  let navigator = null;
  if (loggedInUser) {
    navigator = <SideDrawer />;
  } else {
    navigator = <AuthNavigator />;
  }

  return navigator;
};

export default Main;
