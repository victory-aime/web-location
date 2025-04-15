import { TYPES } from '@shop/shop-shared'
import { IStateModule } from '../../main/types'
import { PRODUCT_KEY_IN_STORE } from './constants'
import ProductsReducer from './reducer'
import { productSagas } from './saga'

export class ProductModule implements IStateModule {
  getRootKeyInStore(): string {
    return PRODUCT_KEY_IN_STORE
  }
  getSagas() {
    return productSagas
  }
  getReducers() {
    return ProductsReducer
  }

  getInitialState(): TYPES.MODELS.PRODUCTS.IProductState {
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
