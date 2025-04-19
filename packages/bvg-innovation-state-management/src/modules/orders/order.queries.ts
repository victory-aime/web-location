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

export const useCreateNewUserOrderMutation = (
  args?: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.ORDERS.CreateOrderDto>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.ORDERS.CreateOrderDto, any, AxiosError>({
    mutationKey: [Constants.CREATE_ORDER],
    mutationFn: (payload) => ordersServiceInstance().createProduct(payload),
    options: args,
  })
}
