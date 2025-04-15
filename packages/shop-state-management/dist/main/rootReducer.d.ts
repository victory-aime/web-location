import { Reducer } from 'redux'
import { IStateModule } from './types'
/**
 * RootReducer class
 * @class RootReducer
 */
export declare class RootReducer {
  private activeModules
  /**
   * rootReducer
   * @member {Reducer<any>}rootReducer rootReducer variable
   */
  rootReducer: Reducer<any>
  /**
   * RootReducer class constructor
   * @constructs
   * @param {IStateModule[]}activeModules
   * @param {Reducer<any>}reducer
   */
  constructor(activeModules: IStateModule[], reducer?: Reducer<any>)
  /**
   * getActiveModules
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules(): IStateModule<any>[]
  /**
   * setActiveModules
   * @method setActiveModules
   * @param {IStateModule[]}activeModule
   * @returns {IStateModule[]}
   */
  setActiveModules(activeModule: IStateModule[]): void
  /**
   * createRootReducer
   * @method createRootReducer
   * @returns {any}
   */
  createRootReducer(): any
  /**
   * getRootReducer
   * @method getRootReducer
   * @returns {Reducer<any>}
   */
  getRootReducer(): Reducer<any>
}
//# sourceMappingURL=rootReducer.d.ts.map
