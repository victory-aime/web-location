import { MyLoaderService } from './myLoader.service'
import { APIS } from '@shop/shop-shared'
import { ApplicationContext, MainModule } from '@shop/shop-state-management'
import { activeModules } from './modules'
import { handleApiError } from '../../utils/handleApiError'
import { handleApiSuccess } from '../../utils/handleApiSuccess'

/**
 * @class GlobalApplicationContext
 * @extends
 * This is where to keep all UI project specific configs and implementation
 * to be used by the underlying layers (StateManagement, Business and Core)
 */
class GlobalApplicationContext extends ApplicationContext.ApplicationContext {
  globalState = MainModule.GlobalState.getInstance(this, activeModules)

  constructor() {
    super()
  }

  /**
   * Holds all possible API configs to be used within the app
   */
  getApiConfig(): any {
    return APIS
  }

  /**
   * Trigger display of alert on error occurred.
   * It will be called mainly from the Core, but it can be called also from any other layer
   * @param response
   */
  //Use Modal Here
  // handleError(response: { status: number; message: string }) {
  //   const message = response?.message || 'Une erreur est survenue'
  //   const status = response?.status
  //   const data = { message, status }
  //
  //   const store = this.globalState.getStore()
  //   console.log('[GlobalApplicationContext] Dispatch error modal', store?.getState?.(), data)
  //
  //   if (store && typeof store.dispatch === 'function') {
  //     store.dispatch(CommonModule.actions.commonShowInfoModalAction(data))
  //   } else {
  //     console.warn('Store not ready to dispatch')
  //   }
  // }
  handleError(response: { status: number; message: string }) {
    handleApiError(response)
  }

  handleInfo(response: { data: any; status: number }) {
    const message = response?.data?.message || ''
    const status = response?.status
    handleApiSuccess({
      message,
      status,
    })
  }

  getLoaderService(): any {
    return new MyLoaderService()
  }

  getChannel(): string {
    return 'WEB'
  }

  /**
   * Get the current device data to sent in headers
   */

  getDeviceDataAsString(): any {
    let deviceId: any = localStorage.getItem('deviceId')
    let osName = ''
    if (navigator.userAgent.indexOf('Windows') !== -1) {
      osName = 'Windows OS'
    }
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      osName = 'MacOS'
    }
    if (navigator.userAgent.indexOf('X11') !== -1) {
      osName = 'UNIX OS'
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      osName = 'Linux OS'
    }

    return `{"deviceId":"${deviceId}","platform":"WEB" ,"os" : "${osName}"}`
  }

  setToken(token: string): void {
    console.log('[Token] Auth token set.',token)
    super.setToken(token)
  }
}

export default new GlobalApplicationContext()
