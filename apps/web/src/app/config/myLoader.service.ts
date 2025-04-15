import globalApplicationContext from './globalApplicationContext'
import { activeModules } from './modules'
import { CommonModule, MainModule } from '@shop/shop-state-management'

export interface ILoaderService {
  showLoader(): void
  hideLoader(): void
}

export class MyLoaderService implements ILoaderService {
  globalState = MainModule.GlobalState.getInstance(globalApplicationContext, activeModules)
  hideLoader() {
    this.globalState?.getStore()?.dispatch(CommonModule.actions.hideLoaderAction())
  }

  showLoader() {
    this.globalState?.getStore()?.dispatch(CommonModule.actions.showLoaderAction())
  }
}
