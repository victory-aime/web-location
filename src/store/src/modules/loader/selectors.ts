import * as Constants from './constants';

export const getLoaderSelector = (state: any) => state[Constants.LOADER_KEY_IN_STORE]?.showLoader;
