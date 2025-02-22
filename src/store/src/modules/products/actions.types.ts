import * as Constants from "./constants";
import { TYPES } from "_store/src";
import { execOnce } from "next/dist/shared/lib/utils";
import { Action } from "redux";

export interface GetAllProductsRequestAction extends Action {
  type: typeof Constants.GET_PRODUCTS;
  payload: string;
}

export interface GetAllProductsRequestActionSuccess extends Action {
  type: typeof Constants.GET_PRODUCTS_SUCCESS;
  payload: TYPES.MODELS.PRODUCTS.IResponseProductList;
}

export interface GetAllProductsRequestActionFailed extends Action {
  type: typeof Constants.GET_PRODUCTS_FAILED;
  payload: string;
}

export interface CreateProductRequest extends Action {
  type: typeof Constants.CREATE_PRODUCT;
  payload: TYPES.MODELS.PRODUCTS.IProduct;
}

export interface CreateProductSuccess extends Action {
  type: typeof Constants.CREATE_PRODUCT_SUCCESS;
}

export interface CreateProductFailed extends Action {
  type: typeof Constants.CREATE_PRODUCT_FAILED;
  payload: string;
}

export interface ClearKeys extends Action {
  type: typeof Constants.CLEAR_PRODUCTS_KEYS;
}

export type ProductActionsTypes =
  | GetAllProductsRequestAction
  | GetAllProductsRequestActionSuccess
  | GetAllProductsRequestActionFailed
  | CreateProductRequest
  | CreateProductSuccess
  | CreateProductFailed
  | ClearKeys;
