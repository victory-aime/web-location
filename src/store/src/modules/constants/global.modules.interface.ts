import { TYPES } from "../..";

export default interface GlobalModuleInterface {
  authState: TYPES.MODELS.AUTH.AuthState;
  productState: TYPES.MODELS.PRODUCTS.IProductState;
  userState: TYPES.MODELS.USERS.UserState;
  wishlist: TYPES.MODELS.WISHLIST.WishlistState;
}
