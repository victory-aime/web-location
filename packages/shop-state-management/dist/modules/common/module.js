import * as Constant from './constants'
import { CommonReducer } from './reducer'
import { commonSaga } from './saga'
export class CommonModule {
  getRootKeyInStore() {
    return Constant.COMMON_KEY_IN_STORE
  }
  getReducers() {
    return CommonReducer
  }
  getSagas() {
    return commonSaga
  }
}
export const commonModuleInstance = new CommonModule()
//# sourceMappingURL=module.js.map
