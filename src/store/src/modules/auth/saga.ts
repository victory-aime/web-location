import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import * as AUTH_ACTION_TYPES from './actions.types';
import isApiError from '_utils/isApisError';

export function* register(action: AUTH_ACTION_TYPES.SignUpRequest): Generator {
  try {
    const apiConfig = APIS().AUTH.SIGN_UP;
    const response = yield call(apiCall, apiConfig, action?.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.SIGN_UP_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.SIGN_UP_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* authSaga(): Generator {
  yield takeLatest(Constants.SIGN_UP_REQUEST, register);
}
