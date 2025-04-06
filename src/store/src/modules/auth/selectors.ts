import * as Constant from "./constants";
import { RootState } from "_store/rootReducer";

export const authSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE];
