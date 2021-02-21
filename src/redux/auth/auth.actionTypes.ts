import {UserExcerpt} from '../../model/UserExcerpt';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const REFRESH_TOKEN = 'REFRESH_TOKEN' as const;

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {user: UserExcerpt; accessToken: string};
}

export interface RefreshToken {
  type: typeof REFRESH_TOKEN;
  payload: {accessToken: string};
}

export interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

export type AuthActionTypes = LoginSuccess | LogoutSuccess | RefreshToken;
