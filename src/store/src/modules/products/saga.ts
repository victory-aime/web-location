import { call, put, takeLatest } from "redux-saga/effects";
import * as Constants from "./constants";
import { apiCall } from "_store/src/services/apiService";
import APIS from "_store/src/endpoints";
import { handleApiError, handleApiSuccess } from "_utils/handleApis";
import * as PRODUCTS_ACTION_TYPES from "./actions.types";
import isApiError from "_utils/isApisError";
import { ToastStatus } from "_/components/custom/toast/CustomToast";
import { getTokenOrThrow } from "_/utils/check.token.utils";

function* getAllProducts(action: any): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.GET_PRODUCTS;
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      null,
      action?.payload,
      false
    );
    handleApiSuccess(response);
    yield put({
      type: Constants.GET_PRODUCTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.GET_PRODUCTS_FAILED,
      payload: error,
    });
  }
}

export function* productSagas(): Generator {
  yield takeLatest(Constants.GET_PRODUCTS, getAllProducts);
}
