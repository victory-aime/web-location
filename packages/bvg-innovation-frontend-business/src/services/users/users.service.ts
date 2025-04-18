import { IApplicationContext, ApiService } from '../../context'
import { TYPES } from 'bvg-innovation-shared'

export class UsersService {
  /**
   * private apiService property
   * @property {ApiService} apiService - private api service instance
   */
  private apiService: ApiService

  /**
   * constructor
   * @constructs ProductsService
   * @param {IApplicationContext} applicationContext - private application context
   */
  constructor(private applicationContext: IApplicationContext) {
    this.apiService = new ApiService(this.applicationContext)
  }

  /**
   * getUserInfo
   * @method whoAmI
   * @param {userId} userId
   * @returns {Promise}
   */
  whoAmI(userId?: string) {
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
