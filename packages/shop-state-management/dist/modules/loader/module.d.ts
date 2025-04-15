import { IStateModule } from '../../main/types'
import { loaderSaga } from './saga'
export declare class LoaderModule implements IStateModule {
  getRootKeyInStore(): string
  getReducers(): any
  getSagas(): typeof loaderSaga
}
export declare const loaderModuleInstance: LoaderModule
//# sourceMappingURL=module.d.ts.map
