import { TYPES } from "../..";
import * as Constants from "./constants";

export interface SetAccessTokenRequestAction {
  type: typeof Constants.SET_ACCESS_TOKEN;
  payload: string;
}

export interface SetRefreshTokenRequestAction {
  type: typeof Constants.SET_REFRESH_TOKEN;
  payload: string;
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
  | SetAccessTokenRequestAction
  | SetRefreshTokenRequestAction
  | ClearKeysRequestAction
  | SignUpRequest
  | SignUpRequestSuccess
  | SignUpRequestFailed;
