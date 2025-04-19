import { TYPES } from '../..'

export interface wishlistItem {
  id: string
  userId: string
  product: TYPES.MODELS.PRODUCTS.IProduct
}
export interface IGetWishlistResponse {
  content: wishlistItem[]
}

export interface wishlistPayload {
  productId?: string | null
  userId?: string | null
}
