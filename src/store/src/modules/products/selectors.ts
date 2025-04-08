import * as Constants from "./constants";
import { RootState } from "_store/rootReducer";

export const productSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE];
