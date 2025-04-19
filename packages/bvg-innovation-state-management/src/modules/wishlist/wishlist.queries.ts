import * as Constants from './constants'
import { wishlistServiceInstance } from './wishlist.service-instance'
import { TYPES } from 'bvg-innovation-shared'
import { AxiosError } from 'axios'

export const getUserWishlistQueries = (
  args: TYPES.QUERY_PAYLOAD.QueryPayload<
    TYPES.MODELS.WISHLIST.wishlistPayload,
    TYPES.MODELS.WISHLIST.IGetWishlistResponse
  >
) => {
  const { payload, queryOptions } = args

  return TYPES.FUNCTIONS.useCustomQuery<TYPES.MODELS.WISHLIST.IGetWishlistResponse, AxiosError>({
    queryKey: [Constants.USERS_WISHLIST, payload],
    queryFn: () => {
      if (!payload?.userId) throw new Error('User ID manquant pour la wishlist')
      return wishlistServiceInstance().wishlist(payload)
    },
    options: queryOptions,
  })
}

export const addWishlistItemMutation = (
  args: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.WISHLIST.wishlistPayload>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.WISHLIST.wishlistPayload, any, AxiosError>({
    mutationKey: [Constants.WISHLIST_ADD_ITEM_REQUEST],
    mutationFn: (payload) => wishlistServiceInstance().createWishlist(payload),
    options: args,
  })
}

export const removeWishlistItemMutation = (
  args: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.WISHLIST.wishlistPayload>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.WISHLIST.wishlistPayload, any, AxiosError>({
    mutationKey: [Constants.WISHLIST_REMOVE_ITEM_REQUEST],
    mutationFn: (payload) => wishlistServiceInstance().removeItemWishlist(payload),
    options: args,
  })
}
