import * as Constant from './constants'
import { LoaderReducer } from './reducer'
import { loaderSaga } from './saga'
export class LoaderModule {
  getRootKeyInStore() {
    return Constant.LOADER_KEY_IN_STORE
  }
  getReducers() {
    return LoaderReducer
  }
  getSagas() {
    return loaderSaga
  }
}
export const loaderModuleInstance = new LoaderModule()
//# sourceMappingURL=module.js.map
