import { TYPES } from 'bvg-innovation-shared'
import { BaseApi } from '../../api'

/**
 * ProductsService provides methods for managing public and private products,
 * including CRUD operations, category retrieval, and soft deletion.
 */
export class ProductsService extends BaseApi {
  /**
   * Retrieves all public products.
   *
   * @param {TYPES.MODELS.PRODUCTS.IGetAllPublicProductsPayload} [requestData] - Optional query parameters for filtering public products.
   * @returns {Promise<any>} - A promise resolving to the list of public products.
   */
  getAllProducts(requestData?: TYPES.MODELS.PRODUCTS.IGetAllPublicProductsPayload): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PUBLIC_PRODUCTS,
      requestData
    )
  }

  /**
   * Retrieves all private products associated with a specific store.
   *
   * @param {Object} storeId - The store identifier.
   * @param {string} storeId.storeId - The ID of the store.
   * @returns {Promise<TYPES.MODELS.PRODUCTS.IPrivateProductResponse>} - A promise resolving to the list of private products.
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
   * Creates a new private product.
   *
   * @param {TYPES.MODELS.PRODUCTS.ICreateProductPayload} payload - The data required to create a product.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  createProduct(payload: TYPES.MODELS.PRODUCTS.ICreateProductPayload): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.CREATE_PRODUCT,
      payload
    )
  }

  /**
   * Updates an existing product.
   *
   * @param {TYPES.MODELS.PRODUCTS.IUpdateProductPayload} payload - The product update data.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  updateProduct(payload: TYPES.MODELS.PRODUCTS.IUpdateProductPayload): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.UPDATE_PRODUCT,
      payload
    )
  }

  /**
   * Retrieves all available product categories.
   *
   * @returns {Promise<TYPES.MODELS.PRODUCTS.IProductsCategories[]>} - A promise resolving to the list of product categories.
   */
  getAllCategories(): Promise<TYPES.MODELS.PRODUCTS.IProductsCategories[]> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.GET_CATEGORIES
    )
  }

  /**
   * Soft deletes a product by moving it to the trash list.
   *
   * @param {Object} productId - Product identifier.
   * @param {string} productId.productId - The ID of the product to soft delete.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  softDeleteProduct(productId: { productId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.SOFT_DELETE_PRODUCT,
      productId
    )
  }

  /**
   * Permanently deletes a product from the trash list.
   *
   * @param {Object} productId - Product identifier.
   * @param {string} productId.productId - The ID of the product to delete permanently.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  deleteProduct(productId: { productId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.DELETE_PRODUCT,
      productId
    )
  }

  /**
   * Restores a previously soft-deleted product from the trash list.
   *
   * @param {Object} productId - Product identifier.
   * @param {string} productId.productId - The ID of the product to restore.
   * @returns {Promise<any>} - A promise resolving to the API response.
   */
  restoreProduct(productId: { productId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.RESTORE_PRODUCT,
      productId
    )
  }

  /**
   * Retrieves the list of soft-deleted products for a specific store.
   *
   * @param {Object} storeId - Store identifier.
   * @param {string} storeId.storeId - The ID of the store.
   * @returns {Promise<any>} - A promise resolving to the list of products in the trash.
   */
  trashList(storeId: { storeId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.TRASH_LIST_PRODUCT,
      storeId
    )
  }
}
