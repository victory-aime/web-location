import * as Constants from "./constants";
import { TYPES } from "../../";

export const setAccessToken = (access_token: string) => ({
  type: Constants.SET_ACCESS_TOKEN,
  payload: access_token,
});

export const setRefreshToken = (refresh_token: string) => ({
  type: Constants.SET_REFRESH_TOKEN,
  payload: refresh_token,
});

export const signUpResquestAction = (payload: TYPES.MODELS.USERS.IUser) => ({
  type: Constants.SIGN_UP_REQUEST,
  payload,
});

export const clearKeys = () => ({
  type: Constants.CLEAR_KEYS,
});
