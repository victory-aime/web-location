import * as Constants from "./constants";
import { RootState } from "_store/rootReducer";

export const getProductsList = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.products;

export const getProductsLoader = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.isLoading;

export const getAddProducts = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.addProduct;

export const getCategoriesProducts = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.categories;

export const getUpdateProduct = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.updateProduct;

export const deleteProductSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.deleteProduct;

export const trashListSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.trashList;

export const restoreProductSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.restoreProduct;

export const productSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE];
