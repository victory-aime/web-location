import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../api'

/**
 * WishlistService provides methods to manage the user's wishlist,
 * including adding, removing, and retrieving wishlist items.
 */
export class WishlistService extends BaseApi {
  /**
   * Adds an item to the user's wishlist.
   *
   * @param {TYPES.MODELS.WISHLIST.wishlistPayload} [payload] - The payload containing wishlist item details.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  createWishlist(payload?: TYPES.MODELS.WISHLIST.wishlistPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().WISHLIST.ADD_WISHLIST_ITEM,
      payload
    )
  }

  /**
   * Removes an item from the user's wishlist.
   *
   * @param {TYPES.MODELS.WISHLIST.wishlistPayload} [payload] - The payload containing wishlist item details.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  removeItemWishlist(payload?: TYPES.MODELS.WISHLIST.wishlistPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().WISHLIST.REMOVE_WISHLIST_ITEM,
      payload
    )
  }

  /**
   * Retrieves the user's wishlist.
   *
   * @param {TYPES.MODELS.WISHLIST.wishlistPayload} payload - The payload containing user or session identifier.
   * @returns {Promise<TYPES.MODELS.WISHLIST.IGetWishlistResponse>} - A promise resolving to the wishlist data.
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
