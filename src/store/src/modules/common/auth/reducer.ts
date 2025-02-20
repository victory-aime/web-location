import { TYPES } from "../../../index";
import * as Constants from "./constants";
import { AuthActionTypes } from "./actions.types";

const initialState: TYPES.MODELS.AUTH.AuthState = {
  currentUser: null,
  otpResponse: null,
  isLoggedIn: false,
  isLoading: false,
  isLogout: false,
  schoolInfo: null,
  startOnboarding: false,
  isSuccess: false,
  sendOtpChallenge: false,
  validateOtpChallenge: false,
  updatePassword: false,
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
        currentUser: action.payload.user,
      };
    case Constants.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Constants.SEND_OTP_REQUEST:
      return {
        ...state,
        sendOtpChallenge: false,
      };

    case Constants.SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOtpChallenge: true,
        otpResponse: action.payload,
      };

    case Constants.SEND_OTP_FAILURE:
      return {
        ...state,
        sendOtpChallenge: false,
        error: action.payload,
      };

    case Constants.VALIDATE_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        validateOtpChallenge: false,
      };

    case Constants.VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        validateOtpChallenge: true,
      };

    case Constants.VALIDATE_OTP_FAILURE:
      return {
        ...state,
        validateOtpChallenge: false,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CLEAR_OTP_CHALLENGE:
      return initialState;

    case Constants.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        updatePassword: false,
        isLoading: true,
      };

    case Constants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePassword: true,
        isLoading: false,
      };

    case Constants.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        updatePassword: false,
        isLoading: false,
        error: action.payload,
      };

    case Constants.AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
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

    case Constants.START_ONBOARDING_PROCESS:
      return {
        ...state,
        startOnboarding: true,
        error: null,
      };
    case Constants.SET_DATA_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case Constants.RESET_SET_DATA_USER:
      return {
        ...state,
        currentUser: null,
      };
    case Constants.SET_DATA_SCHOOL:
      return {
        ...state,
        schoolInfo: action.payload,
      };
    case Constants.RESET_SET_DATA_SCHOOL:
      return {
        ...state,
        schoolInfo: null,
      };
    case Constants.ONBOARDING_PROCESS_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        startOnboarding: false,
        isLoading: false,
        error: null,
      };
    case Constants.SUBMIT_ONBOARDING_PROCESS:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: null,
      };
    case Constants.ONBOARDING_PROCESS_ERROR:
      return {
        ...state,
        isSuccess: false,
        error: action.payload,
        isLoading: false,
      };
    case Constants.CLEAR_ONBOARDING_PROCESS:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
