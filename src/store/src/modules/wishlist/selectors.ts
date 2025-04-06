import * as Constants from "./constants";
import { RootState } from "_store/rootReducer";

export const wishlistSelector = (state: RootState) =>
  state[Constants.WISHLIST_KEY_IN_STORE];
