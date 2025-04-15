import * as Constants from './constants'
export const getAllProductsRequestAction = (storeId) => ({
  type: Constants.GET_PRODUCTS,
  payload: storeId,
})
export const publicProductRequestAction = (payload) => ({
  type: Constants.PUBLIC_PRODUCTS,
  payload,
})
export const publicProductRequestActionSuccess = (payload) => ({
  type: Constants.PUBLIC_PRODUCTS_SUCCESS,
  payload,
})
export const publicProductRequestActionFailed = (payload) => ({
  type: Constants.PUBLIC_PRODUCTS_FAILED,
  payload,
})
export const deleteProductRequest = (productId) => ({
  type: Constants.DELETE_PRODUCT,
  payload: productId,
})
export const softDeleteRequestAction = (productId) => ({
  type: Constants.SOFT_DELETE_PRODUCT,
  payload: productId,
})
export const restoreProductRequestAtion = (productId) => ({
  type: Constants.RESTORE_PRODUCT,
  payload: productId,
})
export const getTrashProductRequestAction = (storeId) => ({
  type: Constants.TRASH_PRODUCT_LIST,
  payload: storeId,
})
export const createProduct = (payload) => ({
  type: Constants.CREATE_PRODUCT,
  payload,
})
export const updateProduct = (payload) => ({
  type: Constants.UPDATE_PRODUCT,
  payload,
})
export const getCategoriesList = () => ({
  type: Constants.GET_CATEGORIES_LIST,
})
export const clearStateKeysAction = () => ({
  type: Constants.CLEAR_PRODUCTS_KEYS,
})
//# sourceMappingURL=actions.js.map
