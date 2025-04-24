import * as Constants from './constants'
import { ordersServiceInstance } from './orders.service-instance'
import { TYPES } from 'bvg-innovation-shared'
import { AxiosError } from 'axios'

export const userOrderListQueries = (
  args: TYPES.QUERY_PAYLOAD.QueryPayload<{ userId: string }, TYPES.MODELS.ORDERS.IResponseListOrder>
) => {
  const { payload, queryOptions } = args
  return TYPES.FUNCTIONS.useCustomQuery<TYPES.MODELS.ORDERS.IResponseListOrder>({
    queryKey: [Constants.USERS_ORDERS_LIST],
    queryFn: () => ordersServiceInstance().getAllUserOrders(payload),
    options: queryOptions,
  })
}

export const getStoreOrderQueries = (
  props: TYPES.QUERY_PAYLOAD.QueryPayload<{ filters: { storeId: string | null; id?: string } }, any>
) => {
  const { payload, queryOptions } = props
  return TYPES.FUNCTIONS.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.STORE_ORDER_LIST],
    queryFn: () => ordersServiceInstance().fetchStoreOrderList(payload.filters),
    options: queryOptions,
  })
}

export const fetchOrderDetailsByStore = (
  props: TYPES.QUERY_PAYLOAD.QueryPayload<
    { data: { storeId: string | null; orderId: string | null } },
    TYPES.MODELS.ORDERS.IResponseOrderDetail
  >
) => {
  const { payload, queryOptions } = props
  return TYPES.FUNCTIONS.useCustomQuery<TYPES.MODELS.ORDERS.IResponseOrderDetail>({
    queryKey: [Constants.ORDERS_DETAILS_STORE],
    queryFn: () => ordersServiceInstance().fetchOrderDetailsStore(payload.data),
    options: queryOptions,
  })
}

export const useCreateNewUserOrderMutation = (
  args?: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.ORDERS.CreateOrderDto>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.ORDERS.CreateOrderDto, any, AxiosError>({
    mutationKey: [Constants.CREATE_ORDER],
    mutationFn: (payload) => ordersServiceInstance().createOrder(payload),
    options: args,
  })
}

export const updateOrderByStore = (
  args: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.ORDERS.IUpdateOrderDto>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.ORDERS.IUpdateOrderDto, any, AxiosError>({
    mutationKey: [Constants.UPDATE_ORDER],
    mutationFn: (payload) => ordersServiceInstance().updateOrderItem(payload),
    options: args,
  })
}
