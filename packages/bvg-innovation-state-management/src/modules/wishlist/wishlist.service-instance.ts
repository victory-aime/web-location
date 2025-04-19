import { WishlistModule, applicationInstance } from 'bvg-innovation-frontend-business'

export const wishlistServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[WishlistService] Aucun contexte d'application défini.")
  }
  return new WishlistModule.WishlistService(context)
}
