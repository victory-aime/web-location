import { TYPES } from '../..';
import * as Constants from './constants';

export const getWishlist = (userId: { userId: string }) => ({
  type: Constants.WISHLIST_REQUEST,
  payload: userId,
});

export const addWishlistItem = (payload: TYPES.MODELS.WISHLIST.wishlistPayload) => ({
  type: Constants.WISHLIST_ADD_ITEM_REQUEST,
  payload,
});

export const removeWishlistItem = (payload: TYPES.MODELS.WISHLIST.wishlistPayload) => ({
  type: Constants.WISHLIST_REMOVE_ITEM_REQUEST,
  payload,
});

export const clearWishlistStore = () => ({
  type: Constants.WISHLIST_CLEAR_STORE,
});
