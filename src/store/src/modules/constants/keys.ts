/** get all principal modules keys
 * in redux store
 */
import { AuthState } from "../../types/models/auth";
import { AUTH_KEY_IN_STORE } from "../common/auth/constants";
import { BVG_COMMON_KEY_IN_STORE } from "../common/bvg-common/constants";
import GlobalModuleInterface from "./global.modules.interface";

/**
 * Mapping keys to state types
 * This is used to map the keys to the state types
 * we use GlobalModuleInterface only for modules that don't have specific types defined.
 */
export interface ModuleStateMapping {
  [AUTH_KEY_IN_STORE]: AuthState;
  [BVG_COMMON_KEY_IN_STORE]: GlobalModuleInterface;
}
