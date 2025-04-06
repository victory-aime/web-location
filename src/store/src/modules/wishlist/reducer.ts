import { TYPES } from "../../index";
import * as Constants from "./constants";
import { WishlistActions } from "./actions.types";

const initialState: TYPES.MODELS.WISHLIST.WishlistState = {
  wishlist: { content: [] },
  loading: false,
  error: null,
  success: false,
};

export const WishlistReducer = (
  state: TYPES.MODELS.WISHLIST.WishlistState = initialState,
  action: WishlistActions
): TYPES.MODELS.WISHLIST.WishlistState => {
  switch (action?.type) {
    case Constants.WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Constants.WISHLIST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: { content: action.payload.content },
      };
    case Constants.WISHLIST_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.WISHLIST_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Constants.WISHLIST_ADD_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case Constants.WISHLIST_ADD_ITEM_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.WISHLIST_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Constants.WISHLIST_REMOVE_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case Constants.WISHLIST_REMOVE_ITEM_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Constants.WISHLIST_CLEAR_STORE:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
