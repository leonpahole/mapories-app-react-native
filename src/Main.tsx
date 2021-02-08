import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getMe} from './api/auth.api';
import {useLoggedInUser} from './hooks/useLoggedInUser';
import {AuthNavigator} from './navigation/AuthNavigator';
import {RootNavigator} from './navigation/RootNavigator';
import {loginAction} from './redux/auth/auth.actions';
import {SplashScreen} from './screens/SplashScreen';

LogBox.ignoreLogs(['Require cycle:']);

const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const loggedInUser = useLoggedInUser();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const me = await getMe();
        dispatch(loginAction(me));
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
    navigator = <RootNavigator />;
  } else {
    navigator = <AuthNavigator />;
  }

  return navigator;
};

export default Main;
