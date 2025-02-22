import { TYPES } from "../..";
import * as Constants from "./constants";

export const getAllProductsRequestAction = (storeId: { storeId: string }) => ({
  type: Constants.GET_PRODUCTS,
  payload: storeId,
});

export const createProduct = (payload: TYPES.MODELS.PRODUCTS.IProduct) => ({
  type: Constants.CREATE_PRODUCT,
  payload,
});

export const clearStateKeysAction = () => ({
  type: Constants.CLEAR_PRODUCTS_KEYS,
});
