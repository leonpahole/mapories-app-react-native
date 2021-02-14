import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Dispatch} from 'react';
import {LoginManager} from 'react-native-fbsdk';
import {UserExcerpt} from '../model/UserExcerpt';
import {loginAction, logoutAction} from '../redux/auth/auth.actions';
import {getRequest, postRequest} from './api';

export const authTokenKey = 'auth_token';
export const refreshTokenKey = 'refresh_token';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserExcerpt;
}

export enum AuthApiErrors {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',
}

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  return postRequest<LoginResponse>('/auth/login', {email, password}, false);
};

export const register = async (
  email: string,
  name: string,
  password: string,
): Promise<UserExcerpt> => {
  return postRequest<UserExcerpt>(
    '/auth/register',
    {email, name, password},
    false,
  );
};

export const refreshToken = async (): Promise<string> => {
  const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
  if (!refreshToken) {
    throw 'No refresh token';
  }

  const res = await postRequest<{accessToken: string}>(
    '/auth/refresh-token',
    {
      refreshToken,
    },
    false,
  );
  return res.accessToken;
};

export const forgotPassword = async (email: string): Promise<void> => {
  return postRequest('/auth/forgot-password', {email}, false);
};

export const resendVerifyMail = async (email: string): Promise<void> => {
  return postRequest('/auth/resend-verify-account-email', {email}, false);
};

export const getMe = async (): Promise<UserExcerpt> => {
  return getRequest<UserExcerpt>('/auth/me');
};

export const onLogin = async (
  loginResponse: LoginResponse,
  dispatch: Dispatch<any>,
) => {
  await AsyncStorage.setItem(authTokenKey, loginResponse.accessToken);
  await AsyncStorage.setItem(refreshTokenKey, loginResponse.refreshToken);
  dispatch(loginAction(loginResponse.user, loginResponse.accessToken));
};

export const onLogout = async (dispatch: Dispatch<any>) => {
  await LoginManager.logOut();
  await AsyncStorage.clear();
  dispatch(logoutAction());
};
