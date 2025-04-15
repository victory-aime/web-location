import { IStateModule } from './types'
/**
 * RootSaga class
 * @class RootSaga
 */
export declare class RootSaga {
  private activeModules
  /**
   * RootSaga constructor class
   * @constructs
   * @param {IStateModule[]}activeModules
   */
  constructor(activeModules: IStateModule[])
  /**
   * get active modules method
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules(): IStateModule[]
  /**
   * get saga from active modules
   * @method getSagasFromActiveModules
   */
  getSagasFromActiveModules(): any[]
  /**
   * get Root saga
   * @method getRootSagas
   * @returns {Generator}
   */
  getRootSagas(): any
}
//# sourceMappingURL=rootSagas.d.ts.map
