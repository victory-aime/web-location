/** get all principal modules keys
 * in redux store
 */

import { TYPES } from "../..";
import { AUTH_KEY_IN_STORE } from "../auth/constants";
import { LOADER_KEY_IN_STORE } from "../loader/constants";
import { PRODUCT_KEY_IN_STORE } from "../products/constants";
import { USERS_KEY_IN_STORE } from "../users/constants";
import GlobalModuleInterface from "./global.modules.interface";

/**
 * Mapping keys to state types
 * This is used to map the keys to the state types
 * we use GlobalModuleInterface only for modules that don't have specific types defined.
 */
export interface ModuleStateMapping {
  [AUTH_KEY_IN_STORE]: TYPES.MODELS.AUTH.AuthState;
  [LOADER_KEY_IN_STORE]: GlobalModuleInterface;
  [PRODUCT_KEY_IN_STORE]: TYPES.MODELS.PRODUCTS.IProductState;
  [USERS_KEY_IN_STORE]: TYPES.MODELS.USERS.UserState;
}
