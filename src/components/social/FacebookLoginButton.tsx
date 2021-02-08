import React, {useState} from 'react';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ColorScheme} from '../../styles/colors';
import {RoundedButton} from '../styled/Buttons';

export type IFacebookLoginButtonProps = {
  onLogin(accessToken: string): void;
};

const FacebookLoginButton: React.FC<IFacebookLoginButtonProps> = ({
  onLogin,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <RoundedButton
      loading={loading}
      disabled={loading}
      backgroundColor={ColorScheme.fb}
      style={{
        marginHorizontal: 10,
      }}
      onPress={async () => {
        setLoading(true);

        try {
          const loginResult = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);

          if (loginResult.isCancelled) {
            console.log('FB login error: cancelled');
            ToastAndroid.show('Login was cancelled.', ToastAndroid.LONG);
            setLoading(false);
            return;
          } else {
            const token = await AccessToken.getCurrentAccessToken();
            if (token?.accessToken) {
              onLogin(token.accessToken);
              setLoading(false);
              return;
            } else {
              console.log('FB login error: empty token');
            }
          }
        } catch (error) {
          console.log('FB login error:');
          console.log(error);
        }

        ToastAndroid.show(
          'An error occurred while logging in with Facebook.',
          ToastAndroid.LONG,
        );
        setLoading(false);
      }}>
      <Icon name="facebook" size={30} color={ColorScheme.white} />
    </RoundedButton>
  );
};

export {FacebookLoginButton};
