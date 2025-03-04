import { TYPES } from "../..";
import * as Constants from "./constants";

export const getAllProductsRequestAction = (storeId: { storeId: string }) => ({
  type: Constants.GET_PRODUCTS,
  payload: storeId,
});

export const publicProductRequestAction = ()=>({
  type:Constants.PUBLIC_PRODUCTS
})

export const deleteProductRequest = (productId: { productId: string }) => ({
  type: Constants.DELETE_PRODUCT,
  payload: productId,
});

export const softDeleteRequestAction = (productId: { productId: string }) => ({
  type: Constants.SOFT_DELETE_PRODUCT,
  payload: productId,
});

export const restoreProductRequestAtion = (productId?: {
  productId: string;
}) => ({
  type: Constants.RESTORE_PRODUCT,
  payload: productId,
});

export const getTrashProductRequestAction = (storeId: { storeId: string }) => ({
  type: Constants.TRASH_PRODUCT_LIST,
  payload: storeId,
});

export const createProduct = (payload: TYPES.MODELS.PRODUCTS.IProduct) => ({
  type: Constants.CREATE_PRODUCT,
  payload,
});

export const updateProduct = (payload: any) => ({
  type: Constants.UPDATE_PRODUCT,
  payload,
});

export const getCategoriesList = () => ({
  type: Constants.GET_CATEGORIES_LIST,
});

export const clearStateKeysAction = () => ({
  type: Constants.CLEAR_PRODUCTS_KEYS,
});
