import { PRODUCT_KEY_IN_STORE } from './constants'
import ProductsReducer from './reducer'
import { productSagas } from './saga'
export class ProductModule {
  getRootKeyInStore() {
    return PRODUCT_KEY_IN_STORE
  }
  getSagas() {
    return productSagas
  }
  getReducers() {
    return ProductsReducer
  }
  getInitialState() {
    return {
      products: {
        content: [],
      },
      trashList: {
        content: [],
      },
      publicProducts: { content: [], totalPages: 0, totalDataPerPage: 0 },
      isLoading: false,
      categories: [],
      updateProduct: false,
      deleteProduct: false,
      restoreProduct: false,
      error: null,
      addProduct: false,
    }
  }
}
export const productsModuleInstance = new ProductModule()
//# sourceMappingURL=module.js.map
