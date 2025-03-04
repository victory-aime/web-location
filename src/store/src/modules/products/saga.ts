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
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      token,
      action?.payload,
      false
    );
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

function* allPublicProducts(): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.PUBLIC_PRODUCTS;
    const response = yield call(
      apiCall,
      apiConfig,
      null,
null,
{},
      false
    );
    yield put({
      type: Constants.PUBLIC_PRODUCTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.PUBLIC_PRODUCTS_FAILED,
      payload: error,
    });
  }
}

function* createProductSaga(
  action: PRODUCTS_ACTION_TYPES.CreateProductRequest
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.CREATE_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      action?.payload,
      token,
      {},
      false
    );
    handleApiSuccess(response);
    yield put({
      type: Constants.CREATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.CREATE_PRODUCT_FAILED,
      payload: error,
    });
  }
}

function* getCategoriesProductSaga(): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.GET_CATEGORIES;
    const token = getTokenOrThrow();
    const response = yield call(apiCall, apiConfig, null, token, {}, false);
    yield put({
      type: Constants.GET_CATEGORIES_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: Constants.GET_CATEGORIES_LIST_FAILED,
      payload: error,
    });
  }
}

function* updateProduct(
  action: PRODUCTS_ACTION_TYPES.UpdateProducRequestAction
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.UPDATE_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      action.payload,
      token,
      {},
      false
    );
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.UPDATE_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: Constants.UPDATE_PRODUCT_FAILED,
      payload: error,
    });
  }
}

function* addedProductToTrash(
  action: PRODUCTS_ACTION_TYPES.DeleteProductRequest
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.SOFT_DELETE_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      token,
      action.payload,
      false
    );
    yield put({
      type: Constants.SOFT_DELETE_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.SOFT_DELETE_PRODUCT_FAILED,
      payload: error,
    });
  }
}

function* getAllTrashProductsList(
  action: PRODUCTS_ACTION_TYPES.TrashRequestList
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.TRASH_LIST_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      token,
      action.payload,
      false
    );
    yield put({
      type: Constants.TRASH_PRODUCT_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.TRASH_PRODUCT_LIST_FAILED,
      payload: error,
    });
  }
}

function* restoreProducts(
  action: PRODUCTS_ACTION_TYPES.RestoreProduct
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.RESTORE_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      token,
      action.payload,
      false
    );
    yield put({
      type: Constants.RESTORE_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.RESTORE_PRODUCT_FAILED,
      payload: error,
    });
  }
}

function* deleteProducts(
  action: PRODUCTS_ACTION_TYPES.DeleteProductRequest
): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.DELETE_PRODUCT;
    const token = getTokenOrThrow();
    const response = yield call(
      apiCall,
      apiConfig,
      null,
      token,
      action.payload,
      false
    );
    handleApiSuccess(response, ToastStatus.INFO);
    yield put({
      type: Constants.DELETE_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(error);
    }
    yield put({
      type: Constants.DELETE_PRODUCT_FAILED,
      payload: error,
    });
  }
}

export function* productSagas(): Generator {
  yield takeLatest(Constants.GET_PRODUCTS, getAllProducts);
  yield takeLatest(Constants.CREATE_PRODUCT, createProductSaga);
  yield takeLatest(Constants.GET_CATEGORIES_LIST, getCategoriesProductSaga);
  yield takeLatest(Constants.UPDATE_PRODUCT, updateProduct);
  yield takeLatest(Constants.SOFT_DELETE_PRODUCT, addedProductToTrash);
  yield takeLatest(Constants.DELETE_PRODUCT, deleteProducts);
  yield takeLatest(Constants.TRASH_PRODUCT_LIST, getAllTrashProductsList);
  yield takeLatest(Constants.RESTORE_PRODUCT, restoreProducts);
  yield takeLatest(Constants.PUBLIC_PRODUCTS, allPublicProducts)
}
