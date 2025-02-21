import * as Constant from "./constants";
import { RootState } from "_store/rootReducer";

export const getAuthUserSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.currentUser;

export const getIsLoggedInSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoggedIn;

export const getAuthLoadingSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoading ?? false;

export const getLogoutSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLogout;

export const getAuthErrorSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.error;

export const authSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE];
