import { TYPES } from 'bvg-innovation-shared'
import * as Constants from './constants'

export const UserCache = {
  getPrivate: () =>
    TYPES.HELPERS.CacheHelper.get<TYPES.MODELS.USERS.IUser>([
      Constants.WOHAMI,
    ]),

  setPrivate: (data: TYPES.MODELS.USERS.IUser) =>
     TYPES.HELPERS.CacheHelper.set([Constants.WOHAMI], data),

  invalidatePrivate: () =>
     TYPES.HELPERS.CacheHelper.invalidate([Constants.WOHAMI]),
}
