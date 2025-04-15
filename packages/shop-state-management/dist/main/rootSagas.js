import { spawn, all, call } from 'redux-saga/effects'
import { forEach } from 'lodash'
/**
 * RootSaga class
 * @class RootSaga
 */
export class RootSaga {
  /**
   * RootSaga constructor class
   * @constructs
   * @param {IStateModule[]}activeModules
   */
  constructor(activeModules) {
    this.activeModules = activeModules
  }
  /**
   * get active modules method
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules() {
    return this.activeModules
  }
  /**
   * get saga from active modules
   * @method getSagasFromActiveModules
   */
  getSagasFromActiveModules() {
    const sagas = []
    if (this.getActiveModules().length) {
      forEach(this.getActiveModules(), (module) => {
        sagas.push(module.getSagas())
      })
    }
    return sagas
  }
  /**
   * get Root saga
   * @method getRootSagas
   * @returns {Generator}
   */
  getRootSagas() {
    const sagas = this.getSagasFromActiveModules()
    return function* rootSaga() {
      yield all(
        sagas.map((saga) =>
          spawn(function* () {
            while (true) {
              try {
                yield call(saga)
                break
              } catch (e) {
                console.error('Saga crashed and restarted:', e)
              }
            }
          })
        )
      )
    }
  }
}
//# sourceMappingURL=rootSagas.js.map
