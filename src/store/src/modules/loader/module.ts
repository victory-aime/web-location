import { IStateModule } from '_store/src/main/types';
import * as Constant from './constants';
import LoaderReducer from './reducer';

export class LoaderModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constant.LOADER_KEY_IN_STORE;
  }
  getReducers() {
    return LoaderReducer;
  }
  getSagas() {
    return null;
  }
}

export const loaderModuleInstance = new LoaderModule();
