import { TYPES } from '../..';

export interface wishlistItem {
  id: string;
  userId: string;
  product: TYPES.MODELS.PRODUCTS.IProduct;
}
export interface wishlist {
  content: wishlistItem[];
}

export interface WishlistState {
  wishlist: wishlist;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface wishlistPayload {
  productId: string;
  userId: string;
}
