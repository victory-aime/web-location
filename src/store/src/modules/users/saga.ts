import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import * as USERS_ACTION_TYPES from './actions.types';
import isApiError from '_utils/isApisError';
import { ToastStatus } from '_/components/custom/toast/interface/toats';

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

export function* updateUser(action: USERS_ACTION_TYPES.UpdateUserInfo): Generator {
  try {
    const apiConfig = APIS().USERS.UPDATE_USER;
    const response = yield call(apiCall, apiConfig, action?.payload);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_USER_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.UPDATE_USER_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* newAddress(action: USERS_ACTION_TYPES.NewShippingAddressRequest): Generator {
  try {
    const apiConfig = APIS().USERS.NEW_ADDRESS;
    const response = yield call(apiCall, apiConfig, action?.payload, {}, false);
    handleApiSuccess(response);
    yield put({
      type: Constants.NEW_SHIPPING_ADDRESS_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.NEW_SHIPPING_ADDRESS_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* editAddress(action: USERS_ACTION_TYPES.NewShippingAddressRequest): Generator {
  try {
    const apiConfig = APIS().USERS.EDIT_ADDRESS;
    const response = yield call(apiCall, apiConfig, action?.payload, {}, false);
    handleApiSuccess(response);
    yield put({
      type: Constants.EDIT_SHIPPING_ADDRESS_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.EDIT_SHIPPING_ADDRESS_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* deleteAddress(action: USERS_ACTION_TYPES.DeleteShippingAddressRequest): Generator {
  try {
    const apiConfig = APIS().USERS.DELETE_ADDRESS;
    const response = yield call(apiCall, apiConfig, null, action?.payload, false);
    handleApiSuccess(response, ToastStatus.WARNING);
    yield put({
      type: Constants.DELETE_SHIPPING_ADDRESS_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.DELETE_SHIPPING_ADDRESS_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* userSaga(): Generator {
  yield takeLatest(Constants.USER_INFO_REQUEST, userInfo);
  yield takeLatest(Constants.UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(Constants.NEW_SHIPPING_ADDRESS_REQUEST, newAddress);
  yield takeLatest(Constants.EDIT_SHIPPING_ADDRESS_REQUEST, editAddress);
  yield takeLatest(Constants.DELETE_SHIPPING_ADDRESS_REQUEST, deleteAddress);
}
