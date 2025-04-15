import * as Constants from './constants'
import { TYPES } from '@shop/shop-shared'
import { Action } from 'redux'
export interface GetAllProductsRequestAction extends Action {
  type: typeof Constants.GET_PRODUCTS
  payload: string
}
export interface GetAllProductsRequestActionSuccess extends Action {
  type: typeof Constants.GET_PRODUCTS_SUCCESS
  payload: TYPES.MODELS.PRODUCTS.IResponseProductList
}
export interface GetAllProductsRequestActionFailed extends Action {
  type: typeof Constants.GET_PRODUCTS_FAILED
  payload: string
}
export interface PublicProductsRequestAction extends Action {
  type: typeof Constants.PUBLIC_PRODUCTS
}
export interface PublicProductsRequestActionSuccess extends Action {
  type: typeof Constants.PUBLIC_PRODUCTS_SUCCESS
  payload: TYPES.MODELS.PRODUCTS.IResponsePublicProduct
}
export interface PublicProductsRequestActionFailed extends Action {
  type: typeof Constants.PUBLIC_PRODUCTS_FAILED
  payload: string
}
export interface UpdateProductRequestAction extends Action {
  type: typeof Constants.UPDATE_PRODUCT
  payload: string
}
export interface UpdateProductRequestActionSuccess extends Action {
  type: typeof Constants.UPDATE_PRODUCT_SUCCESS
  payload: any
}
export interface UpdateProductRequestActionFailed extends Action {
  type: typeof Constants.UPDATE_PRODUCT_FAILED
  payload: string
}
export interface GetAllCategoriesRequestAction extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST
}
export interface GetAllCategoriesRequestActionSuccess extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST_SUCCESS
  payload: any
}
export interface GetAllCategoriesRequestActionFailed extends Action {
  type: typeof Constants.GET_CATEGORIES_LIST_FAILED
  payload: string
}
export interface CreateProductRequest extends Action {
  type: typeof Constants.CREATE_PRODUCT
  payload: TYPES.MODELS.PRODUCTS.IProduct
}
export interface CreateProductSuccess extends Action {
  type: typeof Constants.CREATE_PRODUCT_SUCCESS
}
export interface CreateProductFailed extends Action {
  type: typeof Constants.CREATE_PRODUCT_FAILED
  payload: string
}
export interface DeleteProductRequest extends Action {
  type: typeof Constants.DELETE_PRODUCT
  payload: string
}
export interface DeleteProductSuccess extends Action {
  type: typeof Constants.DELETE_PRODUCT_SUCCESS
}
export interface DeleteProductFailed extends Action {
  type: typeof Constants.DELETE_PRODUCT_FAILED
  payload: string
}
export interface SoftDeleteProductRequest extends Action {
  type: typeof Constants.SOFT_DELETE_PRODUCT
  payload: string
}
export interface SoftDeleteProductSuccess extends Action {
  type: typeof Constants.SOFT_DELETE_PRODUCT_SUCCESS
}
export interface SoftDeleteProductFailed extends Action {
  type: typeof Constants.SOFT_DELETE_PRODUCT_FAILED
  payload: string
}
export interface TrashRequestList extends Action {
  type: typeof Constants.TRASH_PRODUCT_LIST
  payload: string
}
export interface TrashRequestSuccess {
  type: typeof Constants.TRASH_PRODUCT_LIST_SUCCESS
  payload: TYPES.MODELS.PRODUCTS.IResponseProductList
}
export interface TrashRequestFailed {
  type: typeof Constants.TRASH_PRODUCT_LIST_FAILED
  payload: string
}
export interface RestoreProduct extends Action {
  type: typeof Constants.RESTORE_PRODUCT
  payload: string
}
export interface RestoreProductSuccess {
  type: typeof Constants.RESTORE_PRODUCT_SUCCESS
}
export interface RestoreProductFailed {
  type: typeof Constants.RESTORE_PRODUCT_FAILED
  payload: string
}
export interface ClearKeys extends Action {
  type: typeof Constants.CLEAR_PRODUCTS_KEYS
}
export type ProductActionsTypes =
  | GetAllProductsRequestAction
  | GetAllProductsRequestActionSuccess
  | GetAllProductsRequestActionFailed
  | CreateProductRequest
  | CreateProductSuccess
  | CreateProductFailed
  | GetAllCategoriesRequestAction
  | GetAllCategoriesRequestActionSuccess
  | GetAllCategoriesRequestActionFailed
  | UpdateProductRequestAction
  | UpdateProductRequestActionSuccess
  | UpdateProductRequestActionFailed
  | DeleteProductRequest
  | DeleteProductSuccess
  | DeleteProductFailed
  | SoftDeleteProductRequest
  | SoftDeleteProductSuccess
  | SoftDeleteProductFailed
  | TrashRequestList
  | TrashRequestSuccess
  | TrashRequestFailed
  | RestoreProduct
  | RestoreProductSuccess
  | RestoreProductFailed
  | PublicProductsRequestAction
  | PublicProductsRequestActionSuccess
  | PublicProductsRequestActionFailed
  | ClearKeys
//# sourceMappingURL=actions.types.d.ts.map
