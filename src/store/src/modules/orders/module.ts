import { TYPES } from '../..';
import { IStateModule } from '../../main/types';
import { ORDERS_KEY_IN_STORE } from './constants';
import { OrdersReducer } from './reducer';
import { ordersSaga } from './saga';

export class OrdersModule implements IStateModule {
  getRootKeyInStore(): string {
    return ORDERS_KEY_IN_STORE;
  }
  getSagas() {
    return ordersSaga();
  }
  getReducers() {
    return OrdersReducer;
  }

  getInitialState(): TYPES.MODELS.ORDERS.OrdersState {
    return {
      orders: [],
      orderActions: false,
      loading: false,
      error: null,
    };
  }
}

export const ordersModuleInstance = new OrdersModule();
