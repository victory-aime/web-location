import { TYPES } from 'bvg-innovation-shared'
import * as Constants from './constants'

export const ProductCache = {
  getPrivate: () =>
    TYPES.HELPERS.CacheHelper.get<TYPES.MODELS.PRODUCTS.IPrivateProductResponse>([
      Constants.PRIVATE_PRODUCTS,
    ]),

  getPublic: () =>
    TYPES.HELPERS.CacheHelper.get<TYPES.MODELS.PRODUCTS.IGetAllPublicProductsResponse>([
      Constants.ALL_PUBLIC_PRODUCTS,
    ]),

  getCategories: () =>
    TYPES.HELPERS.CacheHelper.get<TYPES.MODELS.PRODUCTS.IProductsCategories[]>([
      Constants.GET_CATEGORIES,
    ]),

  setPrivate: (data: TYPES.MODELS.PRODUCTS.IPrivateProductResponse) =>
     TYPES.HELPERS.CacheHelper.set([Constants.PRIVATE_PRODUCTS], data),

  invalidatePrivate: () =>
     TYPES.HELPERS.CacheHelper.invalidate([Constants.PRIVATE_PRODUCTS]),

  invalidateTrashList: () => TYPES.HELPERS.CacheHelper.invalidate([Constants.TRASH_LIST_PRODUCT]),

  removeQueries: ()=> TYPES.HELPERS.CacheHelper.remove([Constants.PRIVATE_PRODUCTS])
}
