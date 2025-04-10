import * as Constants from './constants';
import { RootState } from '_store/rootReducer';

export const ordersSelector = (state: RootState) => state[Constants.ORDERS_KEY_IN_STORE];
