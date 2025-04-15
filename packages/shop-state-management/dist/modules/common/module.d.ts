import { IStateModule } from '../../main/types'
import { commonSaga } from './saga'
export declare class CommonModule implements IStateModule {
  getRootKeyInStore(): string
  getReducers(): any
  getSagas(): typeof commonSaga
}
export declare const commonModuleInstance: CommonModule
//# sourceMappingURL=module.d.ts.map
