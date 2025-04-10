import * as Constants from './constants';
import { TYPES } from '../../';

export const setTokenKeys = (access_token: string, refresh_token: string) => ({
  type: Constants.SET_TOKEN_KEYS,
  payload: {access_token, refresh_token},
});

export const signUpResquestAction = (payload: TYPES.MODELS.USERS.IUser) => ({
  type: Constants.SIGN_UP_REQUEST,
  payload,
});

export const clearKeys = () => ({
  type: Constants.CLEAR_KEYS,
});
