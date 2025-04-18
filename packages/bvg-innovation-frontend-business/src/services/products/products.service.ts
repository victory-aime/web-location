import { ApiService, IApplicationContext } from '../../context'
import { TYPES } from 'bvg-innovation-shared'

export class ProductsService {
  /**
   * private apiService property
   * @property {ApiService} apiService - private api service instance
   */
  private apiService: ApiService

  /**
   * constructor
   * @constructs ProductsService
   * @param {IApplicationContext} applicationContext - private application context
   */
  constructor(private applicationContext: IApplicationContext) {
    this.apiService = new ApiService(this.applicationContext)
  }

  /**
   * getAllProducts
   * @method getAllProducts
   * @param {any} requestData
   * @returns {Promise}
   */
  getAllProducts(requestData?: TYPES.MODELS.PRODUCTS.IGetAllPublicProductsPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PUBLIC_PRODUCTS,
      requestData
    )
  }

  /**
   * getAllPrivateProductsByStore
   * @method getAllPrivateProductsByStore
   * @param {storeId} storeId
   * @returns {Promise}
   * @description get all private products by store
   */
  getAllPrivateProductsByStore(
    storeId: string
  ): Promise<TYPES.MODELS.PRODUCTS.IPrivateProductResponse> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.GET_PRODUCTS,
      storeId
    )
  }

  /**
   * createProduct
   */
  createProduct(payload: TYPES.MODELS.PRODUCTS.ICreateProductPayload) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PRODUCTS.PRIVATE.CREATE_PRODUCT,
      payload
    )
  }
}
