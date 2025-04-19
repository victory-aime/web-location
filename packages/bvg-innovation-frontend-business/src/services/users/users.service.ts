import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../context/base.api'

export class UsersService extends BaseApi {
  /**
   * getUserInfo
   * @method whoAmI
   * @param {userId} userId
   * @returns {Promise}
   */
  whoAmI(userId?: { userId: string }): Promise<any> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().USERS.PRIVATE.ME, userId)
  }

  /**
   * updateUserInfo
   * @method updateUserInfo
   * @param {TYPES} payload
   */
  updateUserInfo(payload: TYPES.MODELS.USERS.IUpdateUserInfoPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().USERS.PRIVATE.UPDATE_USER,
      payload
    )
  }
}
