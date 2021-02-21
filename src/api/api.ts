import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import {authTokenKey, refreshToken} from './auth.api';
import {API_URL} from '@env';
import store from '../redux/store';
import {refreshTokenAction} from '../redux/auth/auth.actions';

const apiUrl = API_URL;

const commonRequest = async <T>(
  method: string,
  path: string,
  body: any,
  authenticated: boolean,
  additionalHeaders: any = {},
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
    ...additionalHeaders,
  };

  if (authenticated) {
    let token = await AsyncStorage.getItem(authTokenKey);
    let tokenNeedsRefreshing = true;
    if (token) {
      const {exp} = jwtDecode(token) as any;
      if (Date.now() < exp * 1000) {
        tokenNeedsRefreshing = false;
      }
    }

    if (tokenNeedsRefreshing) {
      try {
        const accessToken = await refreshToken();
        await AsyncStorage.setItem(authTokenKey, accessToken);
        store.dispatch(refreshTokenAction(accessToken));
        token = accessToken;
      } catch (e) {
        console.log('Refresh error');
        console.log(e);
      }
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  let convertedBody = body;
  if (convertedBody && headers['Content-Type'] === 'application/json') {
    convertedBody = JSON.stringify(body);
  }

  try {
    console.log(`${method}: ${apiUrl}${path}`);
    const res = await fetch(`${apiUrl}${path}`, {
      method,
      headers,
      body: convertedBody,
    });

    const resJson = await res.json();

    if (res.status >= 400) {
      throw resJson;
    }

    return resJson;
  } catch (e) {
    throw e;
  }
};

export const getRequest = async <T>(
  path: string,
  authenticated: boolean = true,
): Promise<T> => {
  return commonRequest<T>('GET', path, undefined, authenticated);
};

export const postRequest = async <T>(
  path: string,
  body: any = undefined,
  authenticated: boolean = true,
): Promise<T> => {
  return commonRequest<T>('POST', path, body, authenticated);
};

export const deleteRequest = async <T>(
  path: string,
  body: any = undefined,
  authenticated: boolean = true,
): Promise<T> => {
  return commonRequest<T>('DELETE', path, body, authenticated);
};

export const patchFormDataRequest = async <T>(
  path: string,
  body: any = undefined,
  authenticated: boolean = true,
): Promise<T> => {
  return commonRequest<T>('PATCH', path, body, authenticated, {
    'Content-Type': 'multipart/form-data',
  });
};
