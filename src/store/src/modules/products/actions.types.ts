import * as Constants from "./constants";
import { TYPES } from "_store/src";
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

export interface UpdateProducRequestAction extends Action {
  type: typeof Constants.UPDATE_PRODUCT;
  payload: string;
}

export interface UpdateProducRequestActionSuccess extends Action {
  type: typeof Constants.UPDATE_PRODUCT_SUCCESS;
  payload: any;
}

export interface UpdateProducRequestActionFailed extends Action {
  type: typeof Constants.UPDATE_PRODUCT_FAILED;
  payload: string;
}

export interface GetAllCategoriesRequestAction extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST;
}

export interface GetAllCategoriesRequestActionSuccess extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST_SUCCESS;
  payload: any;
}

export interface GetAllCategoriesRequestActionFailed extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST_FAILED;
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
  | GetAllCategoriesRequestAction
  | GetAllCategoriesRequestActionSuccess
  | GetAllCategoriesRequestActionFailed
  | UpdateProducRequestAction
  | UpdateProducRequestActionSuccess
  | UpdateProducRequestActionFailed
  | ClearKeys;
