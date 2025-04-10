import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import * as ORDERS_ACTION_TYPES from './action.types';
import isApiError from '_utils/isApisError';
import { ToastStatus } from '_/components/custom/toast/interface/toats';

export function* userOrderList(action: ORDERS_ACTION_TYPES.userOrderListAction): Generator {
  try {
    const apiConfig = APIS().ORDERS.ORDER_LIST;
    const response = yield call(apiCall, apiConfig, null, action?.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.USERS_ORDERS_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error, ToastStatus.WARNING);
    }
    yield put({
      type: Constants.USERS_ORDERS_LIST_FAILED,
      payload: error,
    });
  }
}

export function* createNewOrder(action: ORDERS_ACTION_TYPES.createOrderAction): Generator {
  try {
    const apiConfig = APIS().ORDERS.NEW_ORDER;
    const response = yield call(apiCall, apiConfig, action?.payload);
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_ORDERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error, ToastStatus.WARNING);
    }
    yield put({
      type: Constants.CREATE_ORDERS_FAILED,
      payload: error,
    });
  }
}

export function* ordersSaga(): Generator {
  yield takeLatest(Constants.USERS_ORDERS_LIST, userOrderList);
  yield takeLatest(Constants.CREATE_ORDERS, createNewOrder);
}
