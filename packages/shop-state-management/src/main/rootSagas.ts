import { spawn, all, call } from 'redux-saga/effects'
import { forEach } from 'lodash'
import { IStateModule } from './types'

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
  constructor(private activeModules: IStateModule[]) {}

  /**
   * get active modules method
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules(): IStateModule[] {
    return this.activeModules
  }

  /**
   * get saga from active modules
   * @method getSagasFromActiveModules
   */
  getSagasFromActiveModules(): any[] {
    const sagas: any[] = []
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
  getRootSagas(): any {
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
