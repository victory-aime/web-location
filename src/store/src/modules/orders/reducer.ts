import { TYPES } from '../../index';
import * as Constants from './constants';
import { OrdersActionType } from './action.types';
import { CREATE_ORDERS_SUCCESS } from './constants';

const initialState: TYPES.MODELS.ORDERS.OrdersState = {
  orders: [],
  loading: false,
  error: null,
  orderActions: false,
};

export const OrdersReducer = (
  state = initialState,
  action: OrdersActionType
): TYPES.MODELS.ORDERS.OrdersState => {
  switch (action.type) {
    case Constants.USERS_ORDERS_LIST:
      return {
        ...state,
        loading: true,
      };
    case Constants.USERS_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case Constants.USERS_ORDERS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.CREATE_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderActions: true,
      };
    case Constants.CREATE_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.CLEAR_ORDERS_LIST:
      return {
        ...initialState,
      };
    default:
      return {
        ...initialState,
      };
  }
};
