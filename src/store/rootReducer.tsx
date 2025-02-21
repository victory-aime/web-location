import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IStateModule } from "_store/src/main/types";
import { activeModules } from "./src/modules/constants/global.modules";
import { ModuleStateMapping } from "./src/modules/constants/keys";

const persistConfig = {
  key: "root",
  storage:
    typeof window !== "undefined" ? storage : (null as unknown as Storage),
};

export type RootState = {
  [K in keyof ModuleStateMapping]: ModuleStateMapping[K];
};

/**
 * Dynamically generate the reducers object by iterating over active modules.
 * Each module provides:
 * - A root key (key where its state will be stored in the Redux store).
 * - Reducers (state management logic for the module).
 */

const reducers = activeModules().reduce((acc, module: IStateModule) => {
  const rootKey = module.getRootKeyInStore();
  const reducer = module.getReducers();
  if (rootKey && reducer) {
    acc[rootKey as keyof RootState] = reducer;
  }
  return acc;
}, {} as RootState);

/**
 * Create the root reducer by combining all module reducers.
 * This will define the overall structure of the Redux state tree.
 */
export const rootReducer = combineReducers<RootState>(reducers);

/**
 * Enhance the rootReducer with persistence functionality.
 * This ensures that parts of the Redux state are saved and restored across sessions.
 */
export const persistedReducer =
  typeof window !== "undefined"
    ? persistReducer(persistConfig, rootReducer)
    : rootReducer; // On ne persiste pas côté serveur
