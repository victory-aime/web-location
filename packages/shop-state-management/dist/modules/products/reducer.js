import * as Constants from './constants'
const initialState = {
  products: {
    content: [],
  },
  categories: [],
  trashList: {
    content: [],
  },
  publicProducts: {
    content: [],
    totalDataPerPage: 0,
    totalPages: 0,
  },
  isLoading: false,
  addProduct: false,
  updateProduct: false,
  deleteProduct: false,
  restoreProduct: false,
  error: null,
}
const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: {
          content: action?.payload.content,
        },
      }
    case Constants.GET_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.PUBLIC_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.PUBLIC_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        publicProducts: {
          content: action.payload.content,
          totalPages: action?.payload.totalPages,
          totalDataPerPage: action?.payload.totalDataPerPage,
        },
      }
    case Constants.PUBLIC_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.UPDATE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateProduct: true,
      }
    case Constants.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.CREATE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addProduct: true,
      }
    case Constants.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.GET_CATEGORIES_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.GET_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      }
    case Constants.GET_CATEGORIES_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteProduct: true,
      }
    case Constants.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.SOFT_DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.SOFT_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteProduct: true,
      }
    case Constants.SOFT_DELETE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case Constants.TRASH_PRODUCT_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.TRASH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trashList: { content: action?.payload?.content },
      }
    case Constants.TRASH_PRODUCT_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action?.payload,
      }
    case Constants.RESTORE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.RESTORE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restoreProduct: true,
      }
    case Constants.RESTORE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action?.payload,
      }
    case Constants.CLEAR_PRODUCTS_KEYS:
      return initialState
    default:
      return state
  }
}
export default ProductsReducer
//# sourceMappingURL=reducer.js.map
