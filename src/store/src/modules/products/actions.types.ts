import * as Constants from "./constants";
import { TYPES } from "_store/src";
import { Action } from "redux";

export interface GetAllProductsRequestAction extends Action {
  type: typeof Constants.GET_PRODUCTS;
  payload: string;
}

export interface GetAllProductsRequestActionSuccess extends Action {
  type: typeof Constants.GET_PRODUCTS_SUCCESS;
  payload: any;
}

export interface GetAllProductsRequestActionFailed extends Action {
  type: typeof Constants.GET_PRODUCTS_FAILED;
  payload: string;
}

export interface ClearKeys extends Action {
  type: typeof Constants.CLEAR_PRODUCTS_KEYS;
}

export type ProductActionsTypes =
  | GetAllProductsRequestAction
  | GetAllProductsRequestActionSuccess
  | GetAllProductsRequestActionFailed
  | ClearKeys;
