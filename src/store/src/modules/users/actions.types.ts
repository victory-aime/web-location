import * as Constants from './constants';
import { TYPES } from '_store/src';
import { Action } from 'redux';

export interface UserInfoRequest extends Action {
  type: typeof Constants.USER_INFO_REQUEST;
  payload: string;
}
export interface UserInfoRequestSuccess extends Action {
  type: typeof Constants.USER_INFO_REQUEST_SUCCESS;
  payload: TYPES.MODELS.USERS.IUser;
}
export interface UserInfoRequestFailed extends Action {
  type: typeof Constants.USER_INFO_REQUEST_FAILED;
  payload: string;
}

export interface UpdateUserInfo extends Action {
  type: typeof Constants.UPDATE_USER_REQUEST;
  payload: string;
}
export interface UpdateUserInfoSuccess extends Action {
  type: typeof Constants.UPDATE_USER_REQUEST_SUCCESS;
  payload: string;
}
export interface UpdateUserInfoFailed extends Action {
  type: typeof Constants.UPDATE_USER_REQUEST_FAILED;
  payload: string;
}

export interface NewShippingAddressRequest extends Action {
  type: typeof Constants.NEW_SHIPPING_ADDRESS_REQUEST;
  payload: TYPES.MODELS.USERS.shippingAddress;
}

export interface NewShippingAddressSuccess extends Action {
  type: typeof Constants.NEW_SHIPPING_ADDRESS_REQUEST_SUCCESS;
}
export interface NewShippingAddressFailed extends Action {
  type: typeof Constants.NEW_SHIPPING_ADDRESS_REQUEST_FAILED;
  payload: string;
}

export interface EditShippingAddressRequest extends Action {
  type: typeof Constants.EDIT_SHIPPING_ADDRESS_REQUEST;
  payload: TYPES.MODELS.USERS.shippingAddress;
}

export interface EditShippingAddressSuccess extends Action {
  type: typeof Constants.EDIT_SHIPPING_ADDRESS_REQUEST_SUCCESS;
}
export interface EditShippingAddressFailed extends Action {
  type: typeof Constants.EDIT_SHIPPING_ADDRESS_REQUEST_FAILED;
  payload: string;
}

export interface DeleteShippingAddressRequest extends Action {
  type: typeof Constants.DELETE_SHIPPING_ADDRESS_REQUEST;
  payload: TYPES.MODELS.USERS.shippingAddress;
}

export interface DeleteShippingAddressSuccess extends Action {
  type: typeof Constants.DELETE_SHIPPING_ADDRESS_REQUEST_SUCCESS;
}
export interface DeleteShippingAddressFailed extends Action {
  type: typeof Constants.DELETE_SHIPPING_ADDRESS_REQUEST_FAILED;
  payload: string;
}

export interface ClearStore extends Action {
  type: typeof Constants.CLEAR_USER_STORE;
}

export type UserActionsTypes =
  | UserInfoRequest
  | UserInfoRequestSuccess
  | UserInfoRequestFailed
  | UpdateUserInfo
  | UpdateUserInfoSuccess
  | UpdateUserInfoFailed
  | NewShippingAddressRequest
  | NewShippingAddressSuccess
  | NewShippingAddressFailed
  | EditShippingAddressRequest
  | EditShippingAddressSuccess
  | EditShippingAddressFailed
  | DeleteShippingAddressRequest
  | DeleteShippingAddressSuccess
  | DeleteShippingAddressFailed
  | ClearStore;
