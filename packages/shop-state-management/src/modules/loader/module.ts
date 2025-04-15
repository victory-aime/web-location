import { IStateModule } from '../../main/types'
import * as Constant from './constants'
import { LoaderReducer } from './reducer'
import { loaderSaga } from './saga'

export class LoaderModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constant.LOADER_KEY_IN_STORE
  }
  getReducers(): any {
    return LoaderReducer
  }
  getSagas() {
    return loaderSaga
  }
}

export const loaderModuleInstance = new LoaderModule()
