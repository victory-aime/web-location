'use client'

import { MainModule, ApplicationContext } from '@shop/shop-state-management'
import globalApplicationContext from './globalApplicationContext'
import { activeModules } from './modules'

/**
 *
 */

ApplicationContext.setApplicationContext(globalApplicationContext)

/**
 * Creating the GlobalState (contains Store, Reducers, Sagas)
 */
const globalState = MainModule?.GlobalState?.getInstance(globalApplicationContext, activeModules)

export { globalState }
