import { applicationInstance } from '../../context'
import { UsersModule } from 'bvg-innovation-frontend-business'

export const usersServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[UsersService] Aucun contexte d'application défini.")
  }
  return new UsersModule.UsersService(context)
}
