import { TYPES } from '@shop/shop-shared'
import { IStateModule } from '../../main/types'
import { productSagas } from './saga'
export declare class ProductModule implements IStateModule {
  getRootKeyInStore(): string
  getSagas(): typeof productSagas
  getReducers(): (state: TYPES.MODELS.PRODUCTS.IProductState | undefined, action: import('./actions.types').ProductActionsTypes) => TYPES.MODELS.PRODUCTS.IProductState
  getInitialState(): TYPES.MODELS.PRODUCTS.IProductState
}
export declare const productsModuleInstance: ProductModule
//# sourceMappingURL=module.d.ts.map
