import { OrdersModule, applicationInstance } from 'bvg-innovation-frontend-business'

export const ordersServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[OrderModules] Aucun contexte d'application défini.")
  }
  return new OrdersModule.OrdersService(context)
}
