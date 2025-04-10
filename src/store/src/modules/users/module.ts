import { TYPES } from '../..';
import { IStateModule } from '../../main/types';
import { USERS_KEY_IN_STORE } from './constants';
import UsersReducer from './reducer';
import { userSaga } from './saga';

export class UsersModule implements IStateModule {
  getRootKeyInStore(): string {
    return USERS_KEY_IN_STORE;
  }
  getSagas() {
    return userSaga();
  }
  getReducers() {
    return UsersReducer;
  }

  getInitialState(): TYPES.MODELS.USERS.UserState {
    return {
      user: null,
      isLoading: false,
      addressAction: false,
      error: null,
    };
  }
}

export const usersModuleInstance = new UsersModule();
