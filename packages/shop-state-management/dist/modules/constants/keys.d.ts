/** get all principal modules keys
 * in redux store
 */
import { TYPES } from '@shop/shop-shared'
import { COMMON_KEY_IN_STORE } from '../common/constants'
import { LOADER_KEY_IN_STORE } from '../loader/constants'
import { PRODUCT_KEY_IN_STORE } from '../products/constants'
import GlobalModuleInterface from './global.modules.interface'
/**
 * Mapping keys to state types
 * This is used to map the keys to the state types
 * we use GlobalModuleInterface only for modules that don't have specific types defined.
 */
export interface ModuleStateMapping {
  [LOADER_KEY_IN_STORE]: GlobalModuleInterface
  [COMMON_KEY_IN_STORE]: TYPES.MODELS.COMMON.ICommonState
  [PRODUCT_KEY_IN_STORE]: TYPES.MODELS.PRODUCTS.IProductState
}
//# sourceMappingURL=keys.d.ts.map
