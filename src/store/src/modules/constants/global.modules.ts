/**
 * We group all modules in the Redux store.
 * Each module follows the IStateModule interface.
 */

import { authModuleInstance } from "_/store/src/modules/auth";
import { loaderModuleInstance } from "_/store/src/modules/loader";
import { productsModuleInstance } from "_store/src/modules/products";
import { usersModuleInstance } from "_store/src/modules/users";
import { wishlistModuleInstance } from "_store/src/modules/wishlist";

// Global IStateModule interface
import { IStateModule } from "_store/src/main/types";

// Group all modules into a single array
export const globalModules: IStateModule[] = [
  authModuleInstance,
  loaderModuleInstance,
  productsModuleInstance,
  usersModuleInstance,
  wishlistModuleInstance,
];

/**
 * List of modules to exclude in certain environments.
 * These modules will be filtered out from the activeModules array.
 */
const EXCLUDED_MODULES: IStateModule[] = [
  /**
   *  Exclude the role management module
   *  Add other modules to exclude here if necessary
   */
];

/**
 * Returns the list of active modules to be included in the Redux store.
 * - Includes all modules in development mode.
 * - Excludes specific modules in other environments (e.g., production).
 */
export const activeModules = (): IStateModule[] => {
  if (process.env.NODE_ENV === "development") {
    return [...globalModules];
  }
  return globalModules.filter((module) => !EXCLUDED_MODULES.includes(module));
};
