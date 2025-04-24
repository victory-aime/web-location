import { TYPES } from 'bvg-innovation-shared'
import * as Constants from './constants'

export const OrderCache = {
  getOrderStore: () =>
    TYPES.HELPERS.CacheHelper.get<any>([
      Constants.STORE_ORDER_LIST,
    ]),
    getOrderDetails: ()=> {
        TYPES.HELPERS.CacheHelper.get<TYPES.MODELS.ORDERS.IResponseOrderDetail>([
            Constants.ORDERS_DETAILS_STORE
        ])
    },
    invalidateOrderDetails :()=> {
        TYPES.HELPERS.CacheHelper.invalidate([Constants.ORDERS_DETAILS_STORE])
    },
    invalidateOrderList: ()=> {
        TYPES.HELPERS.CacheHelper.invalidate([Constants.STORE_ORDER_LIST])
    }
}
