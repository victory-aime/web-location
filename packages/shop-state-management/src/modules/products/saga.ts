import { call, put, takeLatest } from 'redux-saga/effects'
import * as Constants from './constants'
import { APIS, isApiError } from '@shop/shop-shared'
import * as PRODUCTS_ACTION_TYPES from './actions.types'
import * as actions from './actions'
import { apiCall } from '../../services/apiService'

function* getAllProducts(action: any): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.GET_PRODUCTS
    const response = yield call(apiCall, apiConfig, null, action?.payload)
    yield put({
      type: Constants.GET_PRODUCTS_SUCCESS,
      payload: response,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.GET_PRODUCTS_FAILED,
      payload: error,
    })
  }
}

function* allPublicProducts(action: any): Generator {
  try {
    const response = yield call(apiCall, APIS().PRODUCTS.PUBLIC_PRODUCTS, {}, action.payload)
    yield put(actions.publicProductRequestActionSuccess(response))
  } catch (error) {
    yield put(actions.publicProductRequestActionFailed(error))
  }
}

function* createProductSaga(action: PRODUCTS_ACTION_TYPES.CreateProductRequest): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.CREATE_PRODUCT
    const response = yield call(apiCall, apiConfig, action?.payload, {})
    //(response)
    yield put({
      type: Constants.CREATE_PRODUCT_SUCCESS,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.CREATE_PRODUCT_FAILED,
      payload: error,
    })
  }
}

function* getCategoriesProductSaga(): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.GET_CATEGORIES
    const response = yield call(apiCall, apiConfig, null, {})
    yield put({
      type: Constants.GET_CATEGORIES_LIST_SUCCESS,
      payload: response,
    })
  } catch (error) {
    yield put({
      type: Constants.GET_CATEGORIES_LIST_FAILED,
      payload: error,
    })
  }
}

function* updateProduct(action: any): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.UPDATE_PRODUCT
    const response = yield call(apiCall, apiConfig, action.payload, {})
    //(response, ToastStatus.INFO)
    yield put({
      type: Constants.UPDATE_PRODUCT_SUCCESS,
      payload: response,
    })
  } catch (error) {
    yield put({
      type: Constants.UPDATE_PRODUCT_FAILED,
      payload: error,
    })
  }
}

function* addedProductToTrash(action: PRODUCTS_ACTION_TYPES.DeleteProductRequest): Generator {
  try {
    const response = yield call(apiCall, APIS().PRODUCTS.SOFT_DELETE_PRODUCT, null, action.payload)
    yield put({
      type: Constants.SOFT_DELETE_PRODUCT_SUCCESS,
      payload: response,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.SOFT_DELETE_PRODUCT_FAILED,
      payload: error,
    })
  }
}

function* getAllTrashProductsList(action: PRODUCTS_ACTION_TYPES.TrashRequestList): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.TRASH_LIST_PRODUCT
    const response = yield call(apiCall, apiConfig, null, action.payload)
    yield put({
      type: Constants.TRASH_PRODUCT_LIST_SUCCESS,
      payload: response,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.TRASH_PRODUCT_LIST_FAILED,
      payload: error,
    })
  }
}

function* restoreProducts(action: PRODUCTS_ACTION_TYPES.RestoreProduct): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.RESTORE_PRODUCT
    const response = yield call(apiCall, apiConfig, null, action.payload)
    yield put({
      type: Constants.RESTORE_PRODUCT_SUCCESS,
      payload: response,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.RESTORE_PRODUCT_FAILED,
      payload: error,
    })
  }
}

function* deleteProducts(action: PRODUCTS_ACTION_TYPES.DeleteProductRequest): Generator {
  try {
    const apiConfig = APIS().PRODUCTS.DELETE_PRODUCT
    const response = yield call(apiCall, apiConfig, null, action.payload)
    //(response, ToastStatus.INFO)
    yield put({
      type: Constants.DELETE_PRODUCT_SUCCESS,
      payload: response,
    })
  } catch (error) {
    if (isApiError(error)) {
      //(error)
    }
    yield put({
      type: Constants.DELETE_PRODUCT_FAILED,
      payload: error,
    })
  }
}

export function* productSagas(): Generator {
  yield takeLatest(Constants.GET_PRODUCTS, getAllProducts)
  yield takeLatest(Constants.CREATE_PRODUCT, createProductSaga)
  yield takeLatest(Constants.GET_CATEGORIES_LIST, getCategoriesProductSaga)
  yield takeLatest(Constants.UPDATE_PRODUCT, updateProduct)
  yield takeLatest(Constants.SOFT_DELETE_PRODUCT, addedProductToTrash)
  yield takeLatest(Constants.DELETE_PRODUCT, deleteProducts)
  yield takeLatest(Constants.TRASH_PRODUCT_LIST, getAllTrashProductsList)
  yield takeLatest(Constants.RESTORE_PRODUCT, restoreProducts)
  yield takeLatest(Constants.PUBLIC_PRODUCTS, allPublicProducts)
}
