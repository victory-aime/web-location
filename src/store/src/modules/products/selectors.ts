import * as Constants from "./constants";
import { RootState } from "_store/rootReducer";

export const getProductsList = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.products;

export const getProductsLoader = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.isLoading;

export const getAddProducts = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE]?.addProduct;

export const productSelector = (state: RootState) =>
  state[Constants.PRODUCT_KEY_IN_STORE];
