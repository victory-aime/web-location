import * as Constants from "./constants";
import { TYPES } from "_store/src";

export interface LoginRequestAction {
  type: typeof Constants.AUTH_LOGIN_REQUEST;
  payload: TYPES.MODELS.AUTH.AuthRequest;
}

export interface LoginSuccessAction {
  type: typeof Constants.AUTH_LOGIN_SUCCESS;
  payload: TYPES.MODELS.AUTH.AuthPayload;
}

export interface LoginFailureAction {
  type: typeof Constants.AUTH_LOGIN_FAILURE;
  payload: string;
}

export interface ClearSessionAction {
  type: typeof Constants.AUTH_CLEAR_SESSION;
}

export interface ClearSessionActionFaillure {
  type: typeof Constants.AUTH_CLEAR_SESSION_FAILURE;
  payload: string;
}

export interface LogoutRequestAction {
  type: typeof Constants.AUTH_LOGOUT_REQUEST;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | ClearSessionAction
  | ClearSessionActionFaillure;
