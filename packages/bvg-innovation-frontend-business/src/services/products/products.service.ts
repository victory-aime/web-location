import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../context/base.api'

/**
 * ProductsService handles API operations related to products.
 */
export class ProductsService extends BaseApi {
  /**
   * Retrieves all public products.
   * @param requestData - Optional request parameters.
   */
  getAllProducts(requestData?: TYPES.MODELS.PRODUCTS.IGetAllPublicProductsPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PUBLIC_PRODUCTS,
      requestData
    )
  }

  /**
   * Retrieves private products by store.
   * @param storeId - Store identifier.
   */
  getAllPrivateProductsByStore(storeId: {
    storeId: string
  }): Promise<TYPES.MODELS.PRODUCTS.IPrivateProductResponse> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.GET_PRODUCTS,
      storeId
    )
  }

  /**
   * Creates a new product.
   * @param payload - Product creation payload.
   */
  createProduct(payload: TYPES.MODELS.PRODUCTS.ICreateProductPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.CREATE_PRODUCT,
      payload
    )
  }

  /**
   * Update product
   * @param payload
   */
  updateProduct(payload:TYPES.MODELS.PRODUCTS.IUpdateProductPayload) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.UPDATE_PRODUCT, payload)
  }

  /**
   * Retrieves all product categories.
   */
  getAllCategories(): Promise<TYPES.MODELS.PRODUCTS.IProductsCategories[]> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.GET_CATEGORIES
    )
  }

  /**
   * Delete product.
   * Push product in trashlist
   * @param productId - Product delete id.
   */
  softDeleteProduct(productId: { productId: string }) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.SOFT_DELETE_PRODUCT,
      productId
    )
  }
}
