import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn} from '../screens/auth/SignIn';
import {SignUp} from '../screens/auth/SignUp';
import {NavigatorScreen} from '../types/navigator';
import {ForgotPassword} from '../screens/auth/ForgotPassword';
import {ResendVerifyMail} from '../screens/auth/ResendVerifyMail';
import {ColorScheme} from '../styles/colors';
import {SetupSocialAccount} from '../screens/social/SetupSocialAccount';
import {SocialProvider, SocialProviderData} from '../api/social.api';
import {horizontalCardStyleInterpolator} from '../util/cardStyleInterpolators';

export const AuthNavigatorScreens = {
  SignIn: 'SignIn' as const,
  SignUp: 'SignUp' as const,
  ForgotPassword: 'ForgotPassword' as const,
  ResendVerifyMail: 'ResendVerifyMail' as const,
  SetupSocialAccount: 'SetupSocialAccount' as const,
};

export type AuthNavigatorParamList = {
  [AuthNavigatorScreens.SignIn]: undefined;
  [AuthNavigatorScreens.SignUp]: undefined;
  [AuthNavigatorScreens.ForgotPassword]: undefined;
  [AuthNavigatorScreens.ResendVerifyMail]: undefined;
  [AuthNavigatorScreens.SetupSocialAccount]: {
    socialData: SocialProviderData;
    provider: SocialProvider;
    accessToken: string;
  };
};

const AuthStack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthNavigator: React.FC = ({}) => {
  const screens: NavigatorScreen<keyof AuthNavigatorParamList>[] = [
    {
      name: AuthNavigatorScreens.SignIn,
      component: SignIn,
      options: {
        title: '',
        transitionSpec: {
          open: config,
          close: config,
        },
        headerStyle: {
          backgroundColor: ColorScheme.transparent,
          elevation: 0,
        },
      },
    },
    {
      name: AuthNavigatorScreens.SignUp,
      component: SignUp,
      options: {
        title: '',
        transitionSpec: {
          open: config,
          close: config,
        },
        headerStyle: {
          backgroundColor: ColorScheme.transparent,
          elevation: 0,
        },
        cardStyleInterpolator: horizontalCardStyleInterpolator,
      },
    },
    {
      name: AuthNavigatorScreens.ForgotPassword,
      component: ForgotPassword,
      options: {
        title: '',
        headerStyle: {
          backgroundColor: ColorScheme.transparent,
          elevation: 0,
        },
      },
    },
    {
      name: AuthNavigatorScreens.ResendVerifyMail,
      component: ResendVerifyMail,
      options: {
        title: '',
        headerStyle: {
          backgroundColor: ColorScheme.transparent,
          elevation: 0,
        },
      },
    },
    {
      name: AuthNavigatorScreens.SetupSocialAccount,
      component: SetupSocialAccount,
      options: {
        title: '',
        headerStyle: {
          backgroundColor: ColorScheme.transparent,
          elevation: 0,
        },
      },
    },
  ];

  return (
    <AuthStack.Navigator initialRouteName={AuthNavigatorScreens.SignIn}>
      {screens.map((s, i) => (
        <AuthStack.Screen
          key={i}
          name={s.name}
          component={s.component}
          options={() => s.options}
        />
      ))}
    </AuthStack.Navigator>
  );
};

export {AuthNavigator};
