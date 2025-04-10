import * as Constants from './constants';
import { TYPES } from '_store/src';

export const userInfoRequestAction = (userId: { userId: string }) => ({
  type: Constants.USER_INFO_REQUEST,
  payload: userId,
});

export const updateUserRequestInfo = (payload: TYPES.MODELS.USERS.IUser) => ({
  type: Constants.UPDATE_USER_REQUEST,
  payload,
});

export const createNewShippingAddressRequestAction = (
  payload: TYPES.MODELS.USERS.shippingAddress
) => ({
  type: Constants.NEW_SHIPPING_ADDRESS_REQUEST,
  payload,
});

export const editNewShippingAddressRequestAction = (
  payload: TYPES.MODELS.USERS.shippingAddress
) => ({
  type: Constants.EDIT_SHIPPING_ADDRESS_REQUEST,
  payload,
});

export const deleteShippingAddressRequestAction = (addressId: { addressId: string }) => ({
  type: Constants.DELETE_SHIPPING_ADDRESS_REQUEST,
  payload: addressId,
});

export const clearUserStoreRequestAction = () => ({
  type: Constants.CLEAR_USER_STORE,
});
