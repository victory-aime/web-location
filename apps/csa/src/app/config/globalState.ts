'use client'

import { applicationInstance } from 'bvg-innovation-frontend-business'
import { GlobalApplicationContext } from './globalApplicationContext'

/**
 * Instantiate the GlobalApplicationContext
 * This is where to keep all UI project specific configs and implementation
 * to be used by the underlying layers (StateManagement, Business and Core)
 */

export const globalApplicationContext = new GlobalApplicationContext(process.env.NEXT_PUBLIC_BACKEND_URL + '_api/v1')

applicationInstance.setContext(globalApplicationContext)
