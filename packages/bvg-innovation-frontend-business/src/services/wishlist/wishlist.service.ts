import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../context/base.api'

export class WishlistService extends BaseApi {
  /**
   * createWishlist
   * @method createWishlist
   * @returns {Promise}
   * @param payload
   */
  createWishlist(payload?: TYPES.MODELS.WISHLIST.wishlistPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().WISHLIST.ADD_WISHLIST_ITEM,
      payload
    )
  }

  /**
   * removeItemWishlist
   * @method removeItemWishlist
   * @returns {Promise}
   * @param payload
   */
  removeItemWishlist(payload?: TYPES.MODELS.WISHLIST.wishlistPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().WISHLIST.REMOVE_WISHLIST_ITEM,
      payload
    )
  }

  /**
   * removeItemWishlist
   * @method removeItemWishlist
   * @returns {Promise}
   * @param payload
   */
  wishlist(
    payload: TYPES.MODELS.WISHLIST.wishlistPayload
  ): Promise<TYPES.MODELS.WISHLIST.IGetWishlistResponse> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().WISHLIST.GET_WISHLIST,
      payload
    )
  }
}
