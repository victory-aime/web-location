import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../api'

/**
 * OrdersService provides methods to manage user and store orders.
 * It interacts with the API endpoints defined in the application context.
 */
export class OrdersService extends BaseApi {
  /**
   * Retrieves all orders associated with a specific user.
   *
   * @param {Object} [userId] - The user identifier object.
   * @param {string | null} userId.userId - The ID of the user.
   * @returns {Promise<TYPES.MODELS.ORDERS.IResponseListOrder>} - A promise resolving to the list of user's orders.
   */
  getAllUserOrders(userId?: {
    userId: string | null
  }): Promise<TYPES.MODELS.ORDERS.IResponseListOrder> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().ORDERS.ORDER_LIST, userId)
  }

  /**
   * Creates a new order with the given payload.
   *
   * @param {TYPES.MODELS.ORDERS.CreateOrderDto} payload - The data required to create a new order.
   * @returns {Promise<any>} - A promise resolving to the response from the API.
   */
  createOrder(payload: TYPES.MODELS.ORDERS.CreateOrderDto): Promise<any> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().ORDERS.NEW_ORDER, payload)
  }

  /**
   * Retrieves a list of orders filtered by store.
   *
   * @param {Object} filters - The filter parameters.
   * @param {string | null} filters.storeId - The ID of the store.
   * @param {string | null} [filters.id] - Optional order ID filter.
   * @returns {Promise<any>} - A promise resolving to the list of store orders.
   */
  fetchStoreOrderList(filters: { storeId: string | null; id?: string | null }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().ORDERS.ORDER_STORE_LIST,
      filters
    )
  }

  /**
   * Retrieves detailed information of a specific order from a store.
   *
   * @param {Object} params - Parameters required to fetch order details.
   * @param {string | null} params.storeId - The ID of the store.
   * @param {string | null} params.orderId - The ID of the order.
   * @returns {Promise<TYPES.MODELS.ORDERS.IResponseOrderDetail>} - A promise resolving to the order details.
   */
  fetchOrderDetailsStore(params: {
    storeId: string | null
    orderId: string | null
  }): Promise<TYPES.MODELS.ORDERS.IResponseOrderDetail> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().ORDERS.ORDER_DETAILS_BY_STORE,
      params
    )
  }

  /**
   * Updates the status of a specific order item.
   * Only the status of the item within the order will be updated.
   *
   * @param {Object} data - The order item data.
   * @param {string | null} data.id - The ID of the order item.
   * @param {TYPES.MODELS.PRODUCTS.OrderItemStatus} data.status - The new status of the item.
   * @param {string | null} data.storeId - The ID of the store.
   * @returns {Promise<any>} - A promise resolving to the response from the API.
   */
  updateOrderItem(data: {
    id: string | null
    status: TYPES.MODELS.PRODUCTS.OrderItemStatus
    storeId: string | null
  }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().ORDERS.UPDATE_ORDER_BY_VENDOR,
      data
    )
  }
}
