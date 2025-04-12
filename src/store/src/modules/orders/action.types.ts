import * as Constants from './constants';
import { TYPES } from '_store/src';
import { Action } from 'redux';

export interface userOrderListAction extends Action {
  type: typeof Constants.USERS_ORDERS_LIST;
  payload: string;
}

export interface userOrderListSuccessAction extends Action {
  type: typeof Constants.USERS_ORDERS_LIST_SUCCESS;
  payload: TYPES.MODELS.ORDERS.IResponseUserListOrders[];
}
export interface userOrderListFailedAction extends Action {
  type: typeof Constants.USERS_ORDERS_LIST_FAILED;
  payload: string;
}

export interface createOrderAction extends Action {
  type: typeof Constants.CREATE_ORDERS;
  payload: TYPES.MODELS.ORDERS.CreateOrderDto;
}

export interface createOrderSuccessAction extends Action {
  type: typeof Constants.CREATE_ORDERS_SUCCESS;
  payload: string;
}
export interface createOrderFailedAction extends Action {
  type: typeof Constants.CREATE_ORDERS_FAILED;
  payload: string;
}

export interface privateStoreListOrder extends Action {
  type: typeof Constants.STORE_ORDERS_LIST;
  payload: string;
}

export interface privateStoreListOrderSuccess extends Action {
  type: typeof Constants.STORE_ORDERS_LIST_SUCCESS;
  payload: TYPES.MODELS.ORDERS.IResponseStoreListOrder;
}

export interface privateStoreListOrderFailed extends Action {
  type: typeof Constants.STORE_ORDERS_LIST_FAILED;
  payload: string;
}

export interface updateStoreOrder extends Action {
  type: typeof Constants.UPDATE_ORDER_BY_VENDOR;
  payload: string;
}

export interface updateStoreOrderSuccess extends Action {
  type: typeof Constants.UPDATE_ORDER_BY_VENDOR_SUCCESS;
  payload: string;
}

export interface updateStoreOrderFailed extends Action {
  type: typeof Constants.UPDATE_ORDER_BY_VENDOR_FAILED;
  payload: string;
}

export interface clearOrderStoreAction extends Action {
  type: typeof Constants.CLEAR_ORDERS_LIST;
}
export type OrdersActionType =
  | userOrderListAction
  | userOrderListSuccessAction
  | userOrderListFailedAction
  | createOrderAction
  | createOrderSuccessAction
  | createOrderFailedAction
  | privateStoreListOrder
  | privateStoreListOrderSuccess
  | privateStoreListOrderFailed
  | updateStoreOrder
  | updateStoreOrderSuccess
  | updateStoreOrderFailed
  | clearOrderStoreAction;
