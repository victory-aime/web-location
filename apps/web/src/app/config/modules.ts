import { ProductModule, CommonModule } from '@shop/shop-state-management'

/**
 * Registering all State management modules
 */
export const activeModules = [ProductModule.productsModuleInstance, CommonModule.commonModuleInstance]
