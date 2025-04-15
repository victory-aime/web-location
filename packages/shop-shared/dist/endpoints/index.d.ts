type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type APIObjectType = {
  url: string
  method: MethodType
  responseType?: string
  headers?: any
  showLoader?: boolean
  handleErrorManually?: boolean
}
export declare const API_BASIC_URL: {
  SECURED_API: string
  UNSECURED_API: string
}
export declare enum PlatformType {
  WEB = 'WEB',
}
export declare const APIS: (baseUrl?: string) => {
  SEND_EMAIL: {
    CONTACT_US: APIObjectType
  }
  AUTH: {
    SIGN_UP: APIObjectType
  }
  USERS: {
    ME: APIObjectType
    UPDATE_USER: APIObjectType
    NEW_ADDRESS: APIObjectType
    EDIT_ADDRESS: APIObjectType
    DELETE_ADDRESS: APIObjectType
  }
  PRODUCTS: {
    GET_PRODUCTS: APIObjectType
    PUBLIC_PRODUCTS: APIObjectType
    CREATE_PRODUCT: APIObjectType
    UPDATE_PRODUCT: APIObjectType
    GET_CATEGORIES: APIObjectType
    DELETE_PRODUCT: APIObjectType
    SOFT_DELETE_PRODUCT: APIObjectType
    TRASH_LIST_PRODUCT: APIObjectType
    RESTORE_PRODUCT: APIObjectType
  }
  WISHLIST: {
    GET_WISHLIST: APIObjectType
    ADD_WISHLIST_ITEM: APIObjectType
    REMOVE_WISHLIST_ITEM: APIObjectType
  }
  ORDERS: {
    NEW_ORDER: APIObjectType
    ORDER_LIST: APIObjectType
    ORDER_STORE_LIST: APIObjectType
    UPDATE_ORDER_BY_VENDOR: APIObjectType
  }
}
export {}
//# sourceMappingURL=index.d.ts.map
