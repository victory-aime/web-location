import { UnknownAction } from 'redux'
import { SagaMiddleware } from 'redux-saga'
import { IStateModule } from './types'
import { IApplicationContext } from '../applicationContext'
/**
 * GlobalState class
 * @class GlobalState
 */
export declare class GlobalState {
  private readonly applicationContext
  private activeModules
  private store?
  private sagaMiddleware?
  /**
   * GlobalState instance
   * @static
   * @private
   * @member {GlobalState}instance global state instance
   */
  private static instance
  /**
   * GlobalState class constructor
   * @constructs
   * @param {IStateModule[]}activeModules
   * @param {IApplicationContext}applicationContext
   * @param {any}store
   * @param {any}sagaMiddleware
   */
  constructor(applicationContext: IApplicationContext, activeModules: IStateModule[], store?: any | undefined, sagaMiddleware?: SagaMiddleware | undefined)
  /**
   * Get instance if it's already exist or create new once (singleton pattern)
   * @static
   * @public
   * @method getInstance
   * @param applicationContext
   * @param {IStateModule[]}activeModules
   * @param {any}store
   * @param {any}sagaMiddleware
   * @returns {GlobalState}
   */
  static getInstance(applicationContext: IApplicationContext, activeModules: IStateModule[], store?: any, sagaMiddleware?: any): GlobalState
  /**
   * Get active modules injected by super class
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules(): IStateModule[]
  /**
   * create saga middleware
   * @method createSagaMiddleware
   * @returns {IStateModule[]}
   */
  createSagaMiddleware(): any
  /**
   * create saga middleware
   * @method createRootReducer
   * @returns {RootReducer}
   */
  createRootReducer(): (state: any, action: UnknownAction) => any
  /**
   * create saga middleware
   * @method createRootSagas
   * @returns {RootSaga}
   */
  createRootSagas(): any
  /**
   * create store && Overrides the mocked dispatch function after creating the store
   * @method createStore
   */
  createStore(): void
  /**
   * get store instance
   * @method getStore
   */
  getStore(): any
  /**
   * get dispatch from store instance
   * @method getDispatch
   */
  getDispatch(): any
  /**
   * get saga middleware
   * @method getSagaMiddleware
   */
  getSagaMiddleware(): SagaMiddleware<{}> | undefined
  /**
   * get application context
   * @method getApplicationContext
   */
  getApplicationContext(): IApplicationContext
}
//# sourceMappingURL=globalState.d.ts.map
