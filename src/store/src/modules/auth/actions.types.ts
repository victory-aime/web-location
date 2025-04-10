import { TYPES } from '../..';
import * as Constants from './constants';

export interface SetTokenKeysRequestAction {
  type: typeof Constants.SET_TOKEN_KEYS;
  payload: {
    access_token : string,
    refresh_token: string
  };
}

export interface SignUpRequest {
  type: typeof Constants.SIGN_UP_REQUEST;
  payload: TYPES.MODELS.USERS.IUser;
}

export interface SignUpRequestSuccess {
  type: typeof Constants.SIGN_UP_REQUEST_SUCCESS;
}

export interface SignUpRequestFailed {
  type: typeof Constants.SIGN_UP_REQUEST_FAILED;
  payload: string;
}

export interface ClearKeysRequestAction {
  type: typeof Constants.CLEAR_KEYS;
}

export type AuthActionTypes =
  | SetTokenKeysRequestAction
  | ClearKeysRequestAction
  | SignUpRequest
  | SignUpRequestSuccess
  | SignUpRequestFailed;
