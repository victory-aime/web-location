import * as Constants from "./constants";

export const setAccessToken = (access_token: string) => ({
  type: Constants.SET_ACCESS_TOKEN,
  payload: access_token,
});

export const clearAccessToken = () => ({
  type: Constants.CLEAR_ACCESS_TOKEN,
});
