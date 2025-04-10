import * as Constants from './constants';
import { TYPES } from '_store/src';
import { Action } from 'redux';

export interface WishlistRequest extends Action {
  type: typeof Constants.WISHLIST_REQUEST;
  payload: string;
}

export interface WishlistRequestSuccess extends Action {
  type: typeof Constants.WISHLIST_REQUEST_SUCCESS;
  payload: TYPES.MODELS.WISHLIST.wishlist;
}

export interface WishlistRequestFailed extends Action {
  type: typeof Constants.WISHLIST_REQUEST_FAILED;
  payload: string;
}

export interface WishlistAddItemRequest extends Action {
  type: typeof Constants.WISHLIST_ADD_ITEM_REQUEST;
  payload: TYPES.MODELS.WISHLIST.wishlistPayload;
}

export interface WishlistAddItemRequestSuccess extends Action {
  type: typeof Constants.WISHLIST_ADD_ITEM_REQUEST_SUCCESS;
  payload: string;
}

export interface WishlistAddItemRequestFailed extends Action {
  type: typeof Constants.WISHLIST_ADD_ITEM_REQUEST_FAILED;
  payload: string;
}

export interface WishlistRemoveItemRequest extends Action {
  type: typeof Constants.WISHLIST_REMOVE_ITEM_REQUEST;
  payload: TYPES.MODELS.WISHLIST.wishlistPayload;
}

export interface WishlistRemoveItemRequestSuccess extends Action {
  type: typeof Constants.WISHLIST_REMOVE_ITEM_REQUEST_SUCCESS;
}

export interface WishlistRemoveItemRequestFailed extends Action {
  type: typeof Constants.WISHLIST_REMOVE_ITEM_REQUEST_FAILED;
  payload: string;
}
export interface WishlistClearStore extends Action {
  type: typeof Constants.WISHLIST_CLEAR_STORE;
}
export type WishlistActions =
  | WishlistRequest
  | WishlistRequestSuccess
  | WishlistRequestFailed
  | WishlistAddItemRequest
  | WishlistAddItemRequestSuccess
  | WishlistAddItemRequestFailed
  | WishlistRemoveItemRequest
  | WishlistRemoveItemRequestSuccess
  | WishlistRemoveItemRequestFailed
  | WishlistClearStore;
