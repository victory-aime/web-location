import { TYPES } from '../../index';
import * as Constants from './constants';
import { OrdersActionType } from './action.types';
import { CREATE_ORDERS_SUCCESS } from './constants';

const initialState: TYPES.MODELS.ORDERS.OrdersState = {
  orders: [],
  storeOrderList: {
    content: [],
    totalDataPerPage: 0,
    totalPages: 0,
  },
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

    case Constants.STORE_ORDERS_LIST:
      return {
        ...state,
        loading: true,
      };
    case Constants.STORE_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        storeOrderList: {
          content: action.payload.content,
          totalDataPerPage: action.payload.totalDataPerPage,
          totalPages: action.payload.totalPages,
        },
      };

    case Constants.STORE_ORDERS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constants.UPDATE_ORDER_BY_VENDOR:
      return {
        ...state,
      };
    case Constants.UPDATE_ORDER_BY_VENDOR_SUCCESS:
      return {
        ...state,
        orderActions: true,
      };
    case Constants.UPDATE_ORDER_BY_VENDOR_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case Constants.CLEAR_ORDERS_ACTIONS_KEYS:
      return { ...state, orderActions: false };

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
