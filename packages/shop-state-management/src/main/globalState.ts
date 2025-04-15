import { compose, UnknownAction } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initialRootState } from './initialRootState'
import { RootReducer } from './rootReducer'
import { IStateModule } from './types'
import { RootSaga } from './rootSagas'
import { IApplicationContext } from '../applicationContext'

/**
 * GlobalState class
 * @class GlobalState
 */
export class GlobalState {
  /**
   * GlobalState instance
   * @static
   * @private
   * @member {GlobalState}instance global state instance
   */
  private static instance: GlobalState

  /**
   * GlobalState class constructor
   * @constructs
   * @param {IStateModule[]}activeModules
   * @param {IApplicationContext}applicationContext
   * @param {any}store
   * @param {any}sagaMiddleware
   */
  constructor(
    private readonly applicationContext: IApplicationContext,
    private activeModules: IStateModule[],
    private store?: any,
    private sagaMiddleware?: SagaMiddleware
  ) {
    if (applicationContext) {
      this.applicationContext = applicationContext
    } else {
      console.error('GlobalStore::constructor', 'Unable to bootstrap the app correctly. Please provide an ApplicationContext instance to your Store Creator')
    }
    if (sagaMiddleware) {
      this.sagaMiddleware = sagaMiddleware
    } else {
      this.createSagaMiddleware()
    }
    if (store) {
      this.store = store
    } else {
      this.createStore()
    }
  }

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
  public static getInstance(applicationContext: IApplicationContext, activeModules: IStateModule[], store?: any, sagaMiddleware?: any): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState(applicationContext, activeModules, store, sagaMiddleware)
    }

    return GlobalState.instance
  }

  /**
   * Get active modules injected by super class
   * @method getActiveModules
   * @returns {IStateModule[]}
   */
  getActiveModules(): IStateModule[] {
    return this.activeModules
  }

  /**
   * create saga middleware
   * @method createSagaMiddleware
   * @returns {IStateModule[]}
   */
  createSagaMiddleware(): any {
    const initialContext: any = {
      dispatch: () => {
        return null
      },
      applicationContext: this.getApplicationContext(),
    }

    this.sagaMiddleware = createSagaMiddleware(initialContext)
  }

  /**
   * create saga middleware
   * @method createRootReducer
   * @returns {RootReducer}
   */
  createRootReducer(): (state: any, action: UnknownAction) => any {
    return new RootReducer(this.getActiveModules()).getRootReducer()
  }

  /**
   * create saga middleware
   * @method createRootSagas
   * @returns {RootSaga}
   */
  createRootSagas(): any {
    return new RootSaga(this.getActiveModules()).getRootSagas()
  }

  /**
   * create store && Overrides the mocked dispatch function after creating the store
   * @method createStore
   */
  createStore() {
    this.createSagaMiddleware()
    const middlewares: Array<SagaMiddleware | any> = []
    if (this.sagaMiddleware) {
      middlewares.push(this.sagaMiddleware)
    }
    const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 }) || (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    this.store = configureStore({
      reducer: this.createRootReducer(),
      preloadedState: initialRootState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(middlewares),
    })
    this.sagaMiddleware?.setContext({
      dispatch: this.store.dispatch,
      applicationContext: this.getApplicationContext(),
    })
    this.sagaMiddleware?.run(this.createRootSagas())
  }

  /**
   * get store instance
   * @method getStore
   */
  getStore() {
    return this.store
  }

  /**
   * get dispatch from store instance
   * @method getDispatch
   */
  getDispatch() {
    return this.store?.dispatch
  }

  /**
   * get saga middleware
   * @method getSagaMiddleware
   */
  getSagaMiddleware() {
    return this.sagaMiddleware
  }

  /**
   * get application context
   * @method getApplicationContext
   */
  getApplicationContext() {
    return this.applicationContext
  }
}
