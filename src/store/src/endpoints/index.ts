import { WISHLIST } from '../types/models';

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type APIObjectType = {
  url: string;
  method: MethodType;
  responseType?: string;
};
export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
};
type PathBaseKeys = keyof typeof API_BASIC_URL;
export enum PlatformType {
  WEB = 'WEB',
}
const API_BASIC_URL_MAP: Record<PlatformType, typeof API_BASIC_URL> = {
  [PlatformType.WEB]: API_BASIC_URL,
};
type ApiActionProps = {
  pathBase?: PathBaseKeys;
  path: string;
  method: MethodType;
  platformType?: PlatformType;
  baseUrl?: string;
  responseType?: string;
};

const createApiAction = ({
  pathBase = 'SECURED_API',
  method,
  path,
  platformType = PlatformType.WEB,
  baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '_api/v1',
  responseType,
}: ApiActionProps): APIObjectType => {
  const url = baseUrl?.concat(...[API_BASIC_URL_MAP[platformType][pathBase], path]);
  return {
    url,
    method,
    responseType,
  };
};

const APIS = (baseUrl?: string) => {
  return {
    SEND_EMAIL: {
      CONTACT_US: createApiAction({
        pathBase: 'UNSECURED_API',
        path: '/send-email',
        method: 'POST',
        baseUrl,
      }),
    },
    AUTH: {
      SIGN_UP: createApiAction({
        path: '/user/register',
        pathBase: 'UNSECURED_API',
        method: 'POST',
        baseUrl,
      }),
    },
    USERS: {
      ME: createApiAction({
        path: '/user/me',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
      UPDATE_USER: createApiAction({
        path: '/user/update-info',
        pathBase: 'SECURED_API',
        method: 'PATCH',
        baseUrl,
      }),
      NEW_ADDRESS: createApiAction({
        path: '/user/add-shipping-address',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
      EDIT_ADDRESS: createApiAction({
        path: '/user/update-shipping-address',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
      DELETE_ADDRESS: createApiAction({
        path: '/user/delete-shipping-address',
        pathBase: 'SECURED_API',
        method: 'DELETE',
        baseUrl,
      }),
    },
    PRODUCTS: {
      GET_PRODUCTS: createApiAction({
        path: '/products/get-products',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
      PUBLIC_PRODUCTS: createApiAction({
        path: '/products/all-public-products',
        pathBase: 'UNSECURED_API',
        method: 'GET',
        baseUrl,
      }),
      CREATE_PRODUCT: createApiAction({
        path: '/products/add-product',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
      UPDATE_PRODUCT: createApiAction({
        path: '/products/update-product',
        pathBase: 'SECURED_API',
        method: 'PATCH',
        baseUrl,
      }),
      GET_CATEGORIES: createApiAction({
        path: '/categories',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
      DELETE_PRODUCT: createApiAction({
        path: '/products/delete-product',
        pathBase: 'SECURED_API',
        method: 'DELETE',
        baseUrl,
      }),
      SOFT_DELETE_PRODUCT: createApiAction({
        path: '/products/soft-delete-product',
        pathBase: 'SECURED_API',
        method: 'PUT',
        baseUrl,
      }),
      TRASH_LIST_PRODUCT: createApiAction({
        path: '/products/trash-list',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
      RESTORE_PRODUCT: createApiAction({
        path: '/products/restore-product',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
    },
    WISHLIST: {
      GET_WISHLIST: createApiAction({
        path: '/wishlist/get-wishlist',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
      ADD_WISHLIST_ITEM: createApiAction({
        path: '/wishlist/add-to-wishlist',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
      REMOVE_WISHLIST_ITEM: createApiAction({
        path: '/wishlist/remove-from-wishlist',
        pathBase: 'SECURED_API',
        method: 'DELETE',
        baseUrl,
      }),
    },
    ORDERS: {
      NEW_ORDER: createApiAction({
        path: '/order/new-order',
        pathBase: 'SECURED_API',
        method: 'POST',
        baseUrl,
      }),
      ORDER_LIST: createApiAction({
        path: '/order/user-order-list',
        pathBase: 'SECURED_API',
        method: 'GET',
        baseUrl,
      }),
    },
  };
};

export default APIS;
