import { TYPES } from '../..';
import { IStateModule } from '../../main/types';
import { WISHLIST_KEY_IN_STORE } from './constants';
import { WishlistReducer } from './reducer';
import { wishlistSaga } from './saga';

export class WishlistModule implements IStateModule {
  getRootKeyInStore(): string {
    return WISHLIST_KEY_IN_STORE;
  }
  getSagas() {
    return wishlistSaga();
  }
  getReducers() {
    return WishlistReducer;
  }

  getInitialState(): TYPES.MODELS.WISHLIST.WishlistState {
    return {
      wishlist: {
        content: [],
      },
      success: false,
      loading: false,
      error: null,
    };
  }
}

export const wishlistModuleInstance = new WishlistModule();
