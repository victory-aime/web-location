import * as Constants from "./constants";
import { RootState } from "_store/rootReducer";

export const userSelector = (state: RootState) =>
  state[Constants.USERS_KEY_IN_STORE];
