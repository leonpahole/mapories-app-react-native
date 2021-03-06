import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LogBox, PermissionsAndroid} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Main from './src/Main';
import store from './src/redux/store';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN} from '@env';
import ChatSocketProvider from './src/socket/ChatSocket';

import {GoogleSignin} from '@react-native-community/google-signin';
import {navigationRef} from './src/navigation/RootNavigation';

GoogleSignin.configure();
MapboxGL.setAccessToken(MAPBOX_TOKEN);
LogBox.ignoreLogs(['Require cycle:', 'Non-serializable values']);

const App = () => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Mapories Camera Permission',
            message: 'Mapories needs access to location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <ChatSocketProvider>
          <Main />
        </ChatSocketProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
