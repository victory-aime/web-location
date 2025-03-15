import { call, put, takeLatest } from "redux-saga/effects";
import * as Constants from "./constants";
import { apiCall } from "_store/src/services/apiService";
import APIS from "_store/src/endpoints";
import { handleApiError, handleApiSuccess } from "_utils/handleApis";
import * as AUTH_ACTION_TYPES from "./actions.types";
import isApiError from "_utils/isApisError";
import { persistor } from "_/store/store";

export function* loginSaga(
  action: AUTH_ACTION_TYPES.LoginRequestAction
): Generator {
  try {
    const apiConfig = APIS().AUTH.SIGN_IN;
    const response = yield call(apiCall, apiConfig, action.payload);
    const { message, access_token, user } = response;

    handleApiSuccess(message);
    yield put({
      type: Constants.AUTH_LOGIN_SUCCESS,
      payload: { user },
    });
    localStorage.setItem(Constants.STORAGE_CURRENT_USER, access_token);
  } catch (error) {
    console.log("error loginSaga", error);

    if (isApiError(error)) {
      if (isApiError(error)) {
        handleApiError(error);
      }
    }
    yield put({ type: Constants.AUTH_LOGIN_FAILURE, payload: error });
  }
}
export function* logoutSaga(action: any): Generator {
  try {
    const apiConfig = APIS().AUTH.LOG_OUT;
    const response = yield call(apiCall, apiConfig, null, null, action.payload);
    localStorage.removeItem(Constants.STORAGE_CURRENT_USER);
    handleApiSuccess(response);
    yield put({ type: Constants.AUTH_CLEAR_SESSION });
    yield call([persistor, persistor.purge]);
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

export function* authSagas(): Generator {
  yield takeLatest(Constants.AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(Constants.AUTH_LOGOUT_REQUEST, logoutSaga);
}
