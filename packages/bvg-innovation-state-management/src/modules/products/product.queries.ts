import * as Constants from './constants'
import { productServiceInstance } from './product.service-instance'
import { TYPES } from 'bvg-innovation-shared'
import { AxiosError } from 'axios'

export const getPublicProductQueries = (
  props: TYPES.QUERY_PAYLOAD.QueryPayload<
    TYPES.MODELS.PRODUCTS.IGetAllPublicProductsPayload,
    TYPES.MODELS.PRODUCTS.IGetAllPublicProductsResponse
  >
) => {
  const { payload, queryOptions } = props

  return TYPES.FUNCTIONS.useCustomQuery<
    string,
    TYPES.MODELS.PRODUCTS.IGetAllPublicProductsResponse,
    AxiosError
  >({
    queryKey: [Constants.ALL_PUBLIC_PRODUCTS, payload],
    queryFn: () => productServiceInstance().getAllProducts(payload),
    options: queryOptions,
  })
}

export const getPrivateProductQueries = (
  props: TYPES.QUERY_PAYLOAD.QueryPayload<string, TYPES.MODELS.PRODUCTS.IPrivateProductResponse>
) => {
  const { payload, queryOptions } = props
  return TYPES.FUNCTIONS.useCustomQuery<
    string,
    TYPES.MODELS.PRODUCTS.IPrivateProductResponse,
    AxiosError
  >({
    queryKey: [Constants.PRIVATE_PRODUCTS, payload],
    queryFn: () => productServiceInstance().getAllPrivateProductsByStore(payload),
    options: queryOptions,
  })
}

export const createProductMutation = (options?: TYPES.QUERY_PAYLOAD.MutationPayload<string>) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.PRODUCTS.ICreateProductPayload, string>({
    mutationKey: [Constants.CREATE_PRODUCT],
    mutationFn: (payload) => productServiceInstance().createProduct(payload),
    options,
  })
}
