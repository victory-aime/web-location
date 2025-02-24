import { TYPES } from "../..";
import { IStateModule } from "../../main/types";
import { PRODUCT_KEY_IN_STORE } from "./constants";
import ProductsReducer from "./reducer";
import { productSagas } from "./saga";

export class ProductModule implements IStateModule {
  getRootKeyInStore(): string {
    return PRODUCT_KEY_IN_STORE;
  }
  getSagas() {
    return productSagas();
  }
  getReducers() {
    return ProductsReducer;
  }

  getInitialState(): TYPES.MODELS.PRODUCTS.IProductState {
    return {
      products: {
        content: [],
      },
      isLoading: false,
      categories: [],
      updateProduct: false,
      error: null,
      addProduct: false,
    };
  }
}

export const productsModuleInstance = new ProductModule();
