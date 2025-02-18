import { call, put, takeLatest } from "redux-saga/effects";
import * as Constants from "./constants";
import { apiCall } from "_store/src/services/apiService";
import APIS from "_store/src/endpoints";
import { handleApiError, handleApiSuccess } from "_utils/handleApis";
import * as AUTH_ACTION_TYPES from "./actions.types";
import isApiError from "_utils/isApisError";
import { ToastStatus } from "_/components/custom/toast/CustomToast";

export function* loginSaga(
  action: AUTH_ACTION_TYPES.LoginRequestAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.SIGN_IN;
    const response = yield call(apiCall, apiConfig, action.payload);
    const { access_token, currentUser } = response;
    handleApiSuccess(response);
    yield put({
      type: Constants.AUTH_LOGIN_SUCCESS,
      payload: { currentUser },
    });
    localStorage.setItem(Constants.STORAGE_CURRENT_USER, access_token);
  } catch (error) {
    if (isApiError(error)) {
      if (isApiError(error)) {
        handleApiError(error);
      }
    }
    yield put({ type: Constants.AUTH_LOGIN_FAILURE, payload: error });
  }
}
export function* logoutSaga(): Generator {
  try {
    localStorage.removeItem(Constants.STORAGE_CURRENT_USER);
    yield put({ type: Constants.AUTH_CLEAR_SESSION });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.AUTH_CLEAR_SESSION_FAILURE,
      payload: error,
    });
  }
}

export function* onboardingUser(
  action: AUTH_ACTION_TYPES.SubmitOnboardingProcessAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.SIGN_UP;
    const response = yield call(apiCall, apiConfig, action.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.ONBOARDING_PROCESS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.ONBOARDING_PROCESS_ERROR,
      payload: error,
    });
  }
}

export function* sendOtpChallenge(
  action: AUTH_ACTION_TYPES.SendOtpChallengeRequestAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.SEND_OTP;
    const response = yield call(apiCall, apiConfig, action.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.SEND_OTP_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.SEND_OTP_FAILURE,
      payload: error,
    });
  }
}

export function* validateOtpChallenge(
  action: AUTH_ACTION_TYPES.ValidateOtpChallengeRequestAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.VALIDATE_OTP;
    const response = yield call(
      apiCall,
      apiConfig,
      action.payload,
      "",
      {},
      false
    );
    yield put({
      type: Constants.VALIDATE_OTP_SUCCESS,
      payload: response,
    });
    handleApiSuccess(response, ToastStatus.SUCCESS);
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.VALIDATE_OTP_FAILURE,
      payload: error,
    });
  }
}

export function* resetPassword(
  action: AUTH_ACTION_TYPES.UpdatePasswordRequestAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.FORGOT_PASSWORD;
    const response = yield call(apiCall, apiConfig, action.payload);
    yield put({
      type: Constants.UPDATE_PASSWORD_SUCCESS,
      payload: response,
    });
    handleApiSuccess(response);
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.UPDATE_PASSWORD_FAILURE,
      payload: error,
    });
  }
}

export function* authSagas(): Generator {
  yield takeLatest(Constants.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(Constants.AUTH_LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(Constants.SEND_OTP_REQUEST, sendOtpChallenge);
  yield takeLatest(Constants.VALIDATE_OTP_REQUEST, validateOtpChallenge);
  yield takeLatest(Constants.UPDATE_PASSWORD_REQUEST, resetPassword);
  yield takeLatest(Constants.SUBMIT_ONBOARDING_PROCESS, onboardingUser);
}
