import { IStateModule } from "../../main/types";
import { AUTH_KEY_IN_STORE } from "./constants";
import AuthReducer from "./reducer";
import { authSagas } from "_/store/src/modules/auth/saga";
import { TYPES } from "_store/src";

export class AuthModule implements IStateModule {
  getRootKeyInStore(): string {
    return AUTH_KEY_IN_STORE;
  }
  getSagas() {
    return authSagas();
  }
  getReducers() {
    return AuthReducer;
  }
  getInitialState(): TYPES.MODELS.AUTH.AuthState {
    return {
      currentUser: null,
      isLoggedIn: false,
      isLoading: false,
      isLogout: false,
      error: null,
    };
  }
}

export const authModuleInstance = new AuthModule();
