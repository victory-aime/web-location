import { combineReducers } from 'redux'
import { forEach } from 'lodash'
/**
 * RootReducer class
 * @class RootReducer
 */
export class RootReducer {
  /**
   * RootReducer class constructor
   * @constructs
   * @param {IStateModule[]}activeModules
   * @param {Reducer<any>}reducer
   */
  constructor(activeModules, reducer) {
    this.activeModules = activeModules
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
  setActiveModules(activeModule) {
    this.activeModules = activeModule
  }
  /**
   * createRootReducer
   * @method createRootReducer
   * @returns {any}
   */
  createRootReducer() {
    const reducers = {}
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
//# sourceMappingURL=rootReducer.js.map
