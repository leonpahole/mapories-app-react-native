import {UserExcerpt} from '../../model/UserExcerpt';
import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './auth.actionTypes';

interface AuthStateI {
  loggedInUser?: UserExcerpt;
  accessToken?: string;
}

const defaultState: AuthStateI = {
  loggedInUser: undefined,
  accessToken: undefined,
};

const authReducer = (
  state: AuthStateI = defaultState,
  action: AuthActionTypes,
): AuthStateI => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedInUser: undefined,
        accessToken: undefined,
      };
    default:
      return state;
  }
};

export default authReducer;
