import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../context/base.api'

export class OrdersService extends BaseApi {
  /**
   * getAllUserOrders
   * @method getAllUserOrders
   * @returns {Promise}
   * @param userId
   */
  getAllUserOrders(userId?: {
    userId: string | null
  }): Promise<TYPES.MODELS.ORDERS.IResponseListOrder> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().ORDERS.ORDER_LIST, userId)
  }

  /**
   * createProduct
   */
  createProduct(payload: TYPES.MODELS.ORDERS.CreateOrderDto) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().ORDERS.NEW_ORDER, payload)
  }
}
