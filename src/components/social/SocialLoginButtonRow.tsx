import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {onLogin} from '../../api/auth.api';
import {
  loginSocial,
  LoginSocialResponse,
  SocialProvider,
} from '../../api/social.api';
import {AuthNavigatorScreens} from '../../navigation/AuthNavigator';
import {FacebookLoginButton} from './FacebookLoginButton';
import {GoogleLoginButton} from './GoogleLoginButton';

const SocialLoginButtonRow: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSocialLogin = async (
    provider: SocialProvider,
    accessToken: string,
  ) => {
    try {
      const loginResponse = await loginSocial(accessToken, provider);

      if (loginResponse.existingUserLoginData) {
        onLogin(loginResponse.existingUserLoginData, dispatch);
        return;
      } else if (loginResponse.nonExistingUser) {
        navigation.navigate(AuthNavigatorScreens.SetupSocialAccount, {
          socialData: loginResponse.nonExistingUser,
          provider,
          accessToken,
        });
        return;
      }
    } catch (e) {
      console.log('loginSocial error:');
      console.log(e);
    }

    ToastAndroid.show('Unknown error.', ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FacebookLoginButton
        onLogin={async (token) => {
          await onSocialLogin('facebook', token);
        }}
      />
      <GoogleLoginButton
        onLogin={async (token) => {
          await onSocialLogin('google', token);
        }}
      />
    </View>
  );
};

export {SocialLoginButtonRow};
