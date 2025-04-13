import * as Constants from './constants';
import { TYPES } from '_store/src';

export const createOrder = (payload: TYPES.MODELS.ORDERS.CreateOrderDto) => ({
  type: Constants.CREATE_ORDERS,
  payload,
});

export const userOrdersList = (userId: { userId: string | null }) => ({
  type: Constants.USERS_ORDERS_LIST,
  payload: userId,
});

export const getStoreOrderListRequestAction = (payload: any) => ({
  type: Constants.STORE_ORDERS_LIST,
  payload,
});

export const updateOrderStore = (payload: any) => ({
  type: Constants.UPDATE_ORDER_BY_VENDOR,
  payload,
});

export const clearOrderStore = () => ({
  type: Constants.CLEAR_ORDERS_LIST,
});

export const clearOrdersActionsKeys = () => ({
  type: Constants.CLEAR_ORDERS_ACTIONS_KEYS,
});
