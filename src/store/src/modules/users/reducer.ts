import { TYPES } from "../../index";
import * as Constants from "./constants";
import { UserActionsTypes } from "./actions.types";

const initialState: TYPES.MODELS.USERS.UserState = {
  user: null,
  isLoading: false,
  addressAction: false,
  error: null,
};

const UsersReducer = (
  state: TYPES.MODELS.USERS.UserState = initialState,
  action: UserActionsTypes
): TYPES.MODELS.USERS.UserState => {
  switch (action?.type) {
    case Constants.USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.USER_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case Constants.USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Constants.UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.UPDATE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Constants.UPDATE_USER_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Constants.NEW_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.NEW_SHIPPING_ADDRESS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addressAction: true,
      };
    case Constants.NEW_SHIPPING_ADDRESS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        addressAction: false,
        error: action.payload,
      };

    case Constants.EDIT_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.EDIT_SHIPPING_ADDRESS_REQUEST_SUCCESS:
      return {
        ...state,
        addressAction: true,
        isLoading: false,
      };
    case Constants.EDIT_SHIPPING_ADDRESS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        addressAction: false,
        error: action.payload,
      };

    case Constants.CLEAR_USER_STORE:
      return initialState;
    default:
      return state;
  }
};

export default UsersReducer;
