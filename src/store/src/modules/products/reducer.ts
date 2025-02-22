import { TYPES } from "../../index";
import * as Constants from "./constants";
import { ProductActionsTypes } from "./actions.types";

const initialState: TYPES.MODELS.PRODUCTS.IProductState = {
  products: {
    content: [],
  },
  isLoading: false,
  addProduct: false,
  error: null,
};

const ProductsReducer = (
  state: TYPES.MODELS.PRODUCTS.IProductState = initialState,
  action: ProductActionsTypes
): TYPES.MODELS.PRODUCTS.IProductState => {
  switch (action.type) {
    case Constants.GET_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: {
          content: action?.payload.content,
        },
      };
    case Constants.GET_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CREATE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addProduct: true,
      };
    case Constants.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Constants.CLEAR_PRODUCTS_KEYS:
      return initialState;
    default:
      return state;
  }
};

export default ProductsReducer;
