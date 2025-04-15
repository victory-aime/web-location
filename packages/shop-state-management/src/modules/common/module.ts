import { IStateModule } from '../../main/types'
import * as Constant from './constants'
import { CommonReducer } from './reducer'
import { commonSaga } from './saga'

export class CommonModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constant.COMMON_KEY_IN_STORE
  }
  getReducers(): any {
    return CommonReducer
  }
  getSagas() {
    return commonSaga
  }
}

export const commonModuleInstance = new CommonModule()
