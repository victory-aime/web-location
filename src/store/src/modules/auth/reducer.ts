import { TYPES } from "../../index";
import * as Constants from "./constants";
import { AuthActionTypes } from "./actions.types";

const initialState: TYPES.MODELS.AUTH.AuthState = {
  access_token: null,
  currentUser: null,
  refresh_token: null,
};

const AuthReducer = (
  state: TYPES.MODELS.AUTH.AuthState = initialState,
  action: AuthActionTypes
): TYPES.MODELS.AUTH.AuthState => {
  switch (action.type) {
    case Constants.SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };

    case Constants.SET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.payload,
      };

    case Constants.CLEAR_KEYS:
      return { ...initialState };

    default:
      return state;
  }
};

export default AuthReducer;
