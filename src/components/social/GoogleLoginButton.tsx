import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import React from 'react';
import {useState} from 'react';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ColorScheme} from '../../styles/colors';
import {RoundedButton} from '../styled/Buttons';

export type IGoogleLoginButtonProps = {
  onLogin(accessToken: string): void;
};

const GoogleLoginButton: React.FC<IGoogleLoginButtonProps> = ({onLogin}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <RoundedButton
      loading={loading}
      disabled={loading}
      backgroundColor={ColorScheme.google}
      style={{
        marginHorizontal: 10,
      }}
      onPress={async () => {
        setLoading(true);

        try {
          try {
            await GoogleSignin.revokeAccess();
          } catch (e) {}

          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();
          const res = await GoogleSignin.getTokens();

          onLogin(res.accessToken);
        } catch (error) {
          console.log('Google login error:');
          console.log(error);

          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            ToastAndroid.show('Login was cancelled.', ToastAndroid.LONG);
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            ToastAndroid.show(
              'Error: play service are not available.',
              ToastAndroid.LONG,
            );
          } else {
            ToastAndroid.show(
              'An error occurred while logging in with Google.',
              ToastAndroid.LONG,
            );
          }
        }

        setLoading(false);
      }}>
      <Icon name="google" size={30} color={ColorScheme.white} />
    </RoundedButton>
  );
};

export {GoogleLoginButton};
