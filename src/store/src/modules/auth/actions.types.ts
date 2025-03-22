import * as Constants from "./constants";

export interface SetAccessTokenRequestAction {
  type: typeof Constants.SET_ACCESS_TOKEN;
  payload: string;
}

export interface ClearAccessTokenRequestAction {
  type: typeof Constants.CLEAR_ACCESS_TOKEN;
  payload: string;
}

export type AuthActionTypes =
  | SetAccessTokenRequestAction
  | ClearAccessTokenRequestAction;
