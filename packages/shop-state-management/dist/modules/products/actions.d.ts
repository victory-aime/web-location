import { TYPES } from '@shop/shop-shared'
export declare const getAllProductsRequestAction: (storeId: { storeId: string }) => {
  type: string
  payload: {
    storeId: string
  }
}
export declare const publicProductRequestAction: (payload?: any) => {
  type: string
  payload: any
}
export declare const publicProductRequestActionSuccess: (payload: any) => {
  type: string
  payload: any
}
export declare const publicProductRequestActionFailed: (payload: any) => {
  type: string
  payload: any
}
export declare const deleteProductRequest: (productId: { productId: string }) => {
  type: string
  payload: {
    productId: string
  }
}
export declare const softDeleteRequestAction: (productId: { productId: string }) => {
  type: string
  payload: {
    productId: string
  }
}
export declare const restoreProductRequestAtion: (productId?: { productId: string }) => {
  type: string
  payload:
    | {
        productId: string
      }
    | undefined
}
export declare const getTrashProductRequestAction: (storeId: { storeId: string }) => {
  type: string
  payload: {
    storeId: string
  }
}
export declare const createProduct: (payload: TYPES.MODELS.PRODUCTS.IProduct) => {
  type: string
  payload: TYPES.MODELS.PRODUCTS.IProduct
}
export declare const updateProduct: (payload: any) => {
  type: string
  payload: any
}
export declare const getCategoriesList: () => {
  type: string
}
export declare const clearStateKeysAction: () => {
  type: string
}
//# sourceMappingURL=actions.d.ts.map
