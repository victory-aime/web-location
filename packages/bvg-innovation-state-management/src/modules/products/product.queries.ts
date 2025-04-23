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
    TYPES.MODELS.PRODUCTS.IGetAllPublicProductsResponse,
    AxiosError
  >({
    queryKey: [Constants.ALL_PUBLIC_PRODUCTS],
    queryFn: () => productServiceInstance().getAllProducts(payload),
    options: queryOptions,
  })
}

export const getPrivateProductQueries = (
  props: TYPES.QUERY_PAYLOAD.QueryPayload<
    { storeId: string },
    TYPES.MODELS.PRODUCTS.IPrivateProductResponse
  >
) => {
  const { payload, queryOptions } = props
  return TYPES.FUNCTIONS.useCustomQuery<TYPES.MODELS.PRODUCTS.IPrivateProductResponse, AxiosError>({
    queryKey: [Constants.PRIVATE_PRODUCTS],
    queryFn: () =>
      productServiceInstance().getAllPrivateProductsByStore({ storeId: payload.storeId }),
    options: queryOptions,
  })
}

export const getCategories = (
  args: TYPES.QUERY_PAYLOAD.QueryPayload<undefined, TYPES.MODELS.PRODUCTS.IProductsCategories[]>
) => {
  return TYPES.FUNCTIONS.useCustomQuery({
    queryKey: [Constants.GET_CATEGORIES],
    queryFn: () => productServiceInstance().getAllCategories(),
    options: args.queryOptions,
  })
}

export const createProductMutation = (args?: TYPES.QUERY_PAYLOAD.MutationPayload<string>) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.PRODUCTS.ICreateProductPayload, string>({
    mutationKey: [Constants.CREATE_PRODUCT],
    mutationFn: (payload) => productServiceInstance().createProduct(payload),
    options: args,
  })
}

export const updateProductMutation =(args: TYPES.QUERY_PAYLOAD.MutationPayload<any>) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.PRODUCTS.IUpdateProductPayload, any, AxiosError>({
    mutationKey: [Constants.UPDATE_PRODUCT],
    mutationFn: (payload) => productServiceInstance().updateProduct(payload),
    options: args,
  })
}

export const softDeleteProductMutation = (args: TYPES.QUERY_PAYLOAD.MutationPayload<string>) => {
  return TYPES.FUNCTIONS.useCustomMutation<{ productId: string }, any, AxiosError>({
    mutationKey: [Constants.SOFT_DELETE_PRODUCT],
    mutationFn: (payload) => productServiceInstance().softDeleteProduct(payload),
    options: args,
  })
}
