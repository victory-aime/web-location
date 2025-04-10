import { call, put, takeLatest } from 'redux-saga/effects';
import * as Constants from './constants';
import { apiCall } from '_store/src/services/apiService';
import APIS from '_store/src/endpoints';
import { handleApiError, handleApiSuccess } from '_utils/handleApis';
import * as WISHLIST_ACTION_TYPES from './actions.types';
import isApiError from '_utils/isApisError';
import { ToastStatus } from '_/components/custom/toast/interface/toats';

export function* getWishlist(action: WISHLIST_ACTION_TYPES.WishlistRequest): Generator {
  try {
    const apiConfig = APIS().WISHLIST.GET_WISHLIST;
    const response = yield call(apiCall, apiConfig, null, action?.payload, false);
    yield put({
      type: Constants.WISHLIST_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error, ToastStatus.WARNING);
    }
    yield put({
      type: Constants.WISHLIST_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* addWishlistItem(action: WISHLIST_ACTION_TYPES.WishlistAddItemRequest): Generator {
  try {
    const apiConfig = APIS().WISHLIST.ADD_WISHLIST_ITEM;
    const response = yield call(apiCall, apiConfig, action?.payload, {}, false);
    handleApiSuccess(response);
    yield put({
      type: Constants.WISHLIST_ADD_ITEM_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error, ToastStatus.WARNING);
    }
    yield put({
      type: Constants.WISHLIST_ADD_ITEM_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* removeWishlistItem(
  action: WISHLIST_ACTION_TYPES.WishlistRemoveItemRequest
): Generator {
  try {
    const apiConfig = APIS().WISHLIST.REMOVE_WISHLIST_ITEM;
    const response = yield call(apiCall, apiConfig, null, action?.payload, false);
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.WISHLIST_REMOVE_ITEM_REQUEST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error, ToastStatus.WARNING);
    }
    yield put({
      type: Constants.WISHLIST_REMOVE_ITEM_REQUEST_FAILED,
      payload: error,
    });
  }
}

export function* wishlistSaga(): Generator {
  yield takeLatest(Constants.WISHLIST_REQUEST, getWishlist);
  yield takeLatest(Constants.WISHLIST_ADD_ITEM_REQUEST, addWishlistItem);
  yield takeLatest(Constants.WISHLIST_REMOVE_ITEM_REQUEST, removeWishlistItem);
}
