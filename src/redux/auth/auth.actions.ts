import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN} from './auth.actionTypes';
import {UserExcerpt} from '../../model/UserExcerpt';

export const loginAction = (user: UserExcerpt, accessToken: string) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {user, accessToken},
  };
};

export const refreshTokenAction = (accessToken: string) => {
  return {
    type: REFRESH_TOKEN,
    payload: {accessToken},
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
