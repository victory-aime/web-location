import { call, put, takeLatest } from "redux-saga/effects";
import * as Constants from "./constants";
import { apiCall } from "_store/src/services/apiService";
import APIS from "_store/src/endpoints";
import { handleApiError } from "_utils/handleApis";
import * as USERS_ACTION_TYPES from "./actions.types";
import isApiError from "_utils/isApisError";

export function* userInfo(action: any): Generator {
  try {
    const apiConfig = APIS().USERS.ME;
    const response = yield call(apiCall, apiConfig, null, action?.payload);
    yield put({
      type: Constants.USER_INFO_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.USER_INFO_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* userSaga(): Generator {
  yield takeLatest(Constants.USER_INFO_REQUEST, userInfo);
}
