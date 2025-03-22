import { IStateModule } from "../../main/types";
import { AUTH_KEY_IN_STORE } from "./constants";
import AuthReducer from "./reducer";
import { TYPES } from "_store/src";

export class AuthModule implements IStateModule {
  getRootKeyInStore(): string {
    return AUTH_KEY_IN_STORE;
  }
  getSagas() {
    return null;
  }
  getReducers() {
    return AuthReducer;
  }
  getInitialState(): TYPES.MODELS.AUTH.AuthState {
    return {
      currentUser: null,
      access_token: null,
    };
  }
}

export const authModuleInstance = new AuthModule();
