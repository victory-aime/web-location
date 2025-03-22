import * as Constant from "./constants";
import { RootState } from "_store/rootReducer";

export const getAuthUserSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.currentUser;

export const accessToken = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE].access_token;

export const authSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE];
