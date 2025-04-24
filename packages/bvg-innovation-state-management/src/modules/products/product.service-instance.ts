import { applicationInstance } from '../../context'
import {ProductModule} from 'bvg-innovation-frontend-business'

export const productServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[ProductService] Aucun contexte d'application défini.")
  }
  return new ProductModule.ProductsService(context)
}
