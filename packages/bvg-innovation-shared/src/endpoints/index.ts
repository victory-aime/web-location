type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type APIObjectType = {
  url: string
  method: MethodType
  responseType?: string
  headers?: any
  showResponse?: boolean
  handleErrorManually?: boolean
}

export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
}
type PathBaseKeys = keyof typeof API_BASIC_URL

export enum PlatformType {
  WEB = 'WEB',
}

const API_BASIC_URL_MAP: Record<PlatformType, typeof API_BASIC_URL> = {
  [PlatformType.WEB]: API_BASIC_URL,
}

type ApiActionProps = {
  path: string
  method: MethodType
  pathBase?: PathBaseKeys
  platformType?: PlatformType
  baseUrl?: string
  responseType?: string
  showResponse?: boolean
  handleErrorManually?: boolean
}

const createApiAction = ({
  path,
  method,
  pathBase = 'SECURED_API',
  platformType = PlatformType.WEB,
  baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '_api/v1',
  responseType,
  showResponse = true,
  handleErrorManually = true,
}: ApiActionProps): APIObjectType => {
  const base = API_BASIC_URL_MAP[platformType][pathBase]
  return {
    url: `${baseUrl}${base}${path}`,
    method,
    responseType,
    showResponse,
    handleErrorManually,
  }
}

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl })

  return {
    SEND_EMAIL: {
      CONTACT_US: api({ pathBase: 'UNSECURED_API', path: '/send-email', method: 'POST' }),
    },
    AUTH: {
      SIGN_UP: api({ path: '/user/register', pathBase: 'UNSECURED_API', method: 'POST' }),
    },
    USERS: {
      PRIVATE: {
        ME: api({
          path: '/user/me',
          method: 'GET',
          showResponse: false,
          handleErrorManually: false,
        }),
        UPDATE_USER: api({ path: '/user/update-info', method: 'PATCH' }),
      },
      NEW_ADDRESS: api({ path: '/user/add-shipping-address', method: 'POST' }),
      EDIT_ADDRESS: api({ path: '/user/update-shipping-address', method: 'POST' }),
      DELETE_ADDRESS: api({ path: '/user/delete-shipping-address', method: 'DELETE' }),
    },
    PRODUCTS: {
      PRIVATE: {
        GET_PRODUCTS: api({ path: '/products/get-products', method: 'GET', showResponse: false }),
        CREATE_PRODUCT: api({ path: '/products/add-product', method: 'POST' }),
        UPDATE_PRODUCT: api({ path: '/products/update-product', method: 'PATCH' }),
        GET_CATEGORIES: api({ path: '/categories', method: 'GET', showResponse:false }),
        DELETE_PRODUCT: api({ path: '/products/delete-product', method: 'DELETE',  }),
        SOFT_DELETE_PRODUCT: api({ path: '/products/soft-delete-product', method: 'PUT',showResponse:false }),
        TRASH_LIST_PRODUCT: api({ path: '/products/trash-list', method: 'GET', showResponse:false }),
        RESTORE_PRODUCT: api({ path: '/products/restore-product', method: 'POST', showResponse:false }),
      },
      PUBLIC_PRODUCTS: api({
        path: '/products/all-public-products',
        method: 'GET',
        pathBase: 'UNSECURED_API',
        showResponse: false
      }),
    },
    WISHLIST: {
      GET_WISHLIST: api({ path: '/wishlist/get-wishlist', method: 'GET', showResponse:false }),
      ADD_WISHLIST_ITEM: api({ path: '/wishlist/add-to-wishlist', method: 'POST' }),
      REMOVE_WISHLIST_ITEM: api({ path: '/wishlist/remove-from-wishlist', method: 'DELETE' }),
    },
    ORDERS: {
      NEW_ORDER: api({ path: '/order/new-order', method: 'POST' }),
      ORDER_LIST: api({ path: '/order/user-order-list', method: 'GET', showResponse:false }),
      ORDER_STORE_LIST: api({ path: '/order/store-order-list', method: 'GET', showResponse:false }),
      ORDER_DETAILS_BY_STORE: api({ path: '/order/get-order-details-store', method: 'GET', showResponse:false }),
      UPDATE_ORDER_BY_VENDOR: api({ path: '/order/update-order', method: 'PATCH' }),
    },
  }
}
