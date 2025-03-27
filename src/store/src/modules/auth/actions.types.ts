import * as Constants from "./constants";

export interface SetAccessTokenRequestAction {
  type: typeof Constants.SET_ACCESS_TOKEN;
  payload: string;
}

export interface SetRefreshTokenRequestAction {
  type: typeof Constants.SET_REFRESH_TOKEN;
  payload: string;
}

export interface ClearKeysRequestAction {
  type: typeof Constants.CLEAR_KEYS;
}

export type AuthActionTypes =
  | SetAccessTokenRequestAction
  | SetRefreshTokenRequestAction
  | ClearKeysRequestAction;
