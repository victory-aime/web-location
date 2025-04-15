import { combineReducers, Reducer } from 'redux'
import { forEach } from 'lodash'
import { IStateModule } from './types'

/**
 * RootReducer class
 * @class RootReducer
 */
export class RootReducer {
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
  constructor(
    private activeModules: IStateModule[],
    reducer?: Reducer<any>
  ) {
    if (reducer) {
      this.rootReducer = reducer
    } else {
      this.rootReducer = this.createRootReducer()
    }
  }

  /**
   * getActiveModules
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules() {
    return this.activeModules
  }

  /**
   * setActiveModules
   * @method setActiveModules
   * @param {IStateModule[]}activeModule
   * @returns {IStateModule[]}
   */
  setActiveModules(activeModule: IStateModule[]) {
    this.activeModules = activeModule
  }

  /**
   * createRootReducer
   * @method createRootReducer
   * @returns {any}
   */
  createRootReducer(): any {
    const reducers: any = {}
    if (this.getActiveModules().length) {
      forEach(this.getActiveModules(), (module) => {
        reducers[module.getRootKeyInStore()] = module.getReducers()
      })
    }
    return combineReducers(reducers)
  }

  /**
   * getRootReducer
   * @method getRootReducer
   * @returns {Reducer<any>}
   */
  getRootReducer() {
    return this.rootReducer
  }
}
