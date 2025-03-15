import { TYPES } from "../../index";
import * as Constants from "./constants";
import { AuthActionTypes } from "./actions.types";

const initialState: TYPES.MODELS.AUTH.AuthState = {
  currentUser: null,

  isLoggedIn: false,
  isLoading: false,
  isLogout: false,
  error: null,
};

const AuthReducer = (
  state: TYPES.MODELS.AUTH.AuthState = initialState,
  action: AuthActionTypes
): TYPES.MODELS.AUTH.AuthState => {
  switch (action.type) {
    case Constants.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Constants.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        isLogout: false,
        currentUser: action.payload.user,
      };
    case Constants.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Constants.AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.AUTH_LOGOUT_REQUEST_SUCCESS:
      return {
        ...initialState,
        isLoading: false,
        isLogout: true,
      };
    case Constants.AUTH_LOGOUT_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case Constants.AUTH_CLEAR_SESSION:
      return { ...initialState, isLogout: true, isLoading: false };

    case Constants.AUTH_CLEAR_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLogout: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
