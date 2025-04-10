import { IStateModule } from '../../main/types';
import { AUTH_KEY_IN_STORE } from './constants';
import AuthReducer from './reducer';
import { TYPES } from '_store/src';
import { authSaga } from './saga';

export class AuthModule implements IStateModule {
  getRootKeyInStore(): string {
    return AUTH_KEY_IN_STORE;
  }
  getSagas() {
    return authSaga();
  }
  getReducers() {
    return AuthReducer;
  }
  getInitialState(): TYPES.MODELS.AUTH.AuthState {
    return {
      currentUser: null,
      access_token: null,
      refresh_token: null,
      loading: false,
      success: false,
      error: null,
    };
  }
}

export const authModuleInstance = new AuthModule();
