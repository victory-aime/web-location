type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type APIObjectType = {
  url: string;
  method: MethodType;
  responseType?: string;
};
export const API_BASIC_URL = {
  SECURED_API: "/secure",
  UNSECURED_API: "/unsecured",
};
type PathBaseKeys = keyof typeof API_BASIC_URL;
export enum PlatformType {
  WEB = "WEB",
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
  pathBase = "SECURED_API",
  method,
  path,
  platformType = PlatformType.WEB,
  baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "_api/v1",
  responseType,
}: ApiActionProps): APIObjectType => {
  const url = baseUrl?.concat(
    ...[API_BASIC_URL_MAP[platformType][pathBase], path]
  );
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
        pathBase: "UNSECURED_API",
        path: "/send-email",
        method: "POST",
        baseUrl,
      }),
    },
    AUTH: {
      SIGN_IN: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth/login",
        method: "POST",
        baseUrl,
      }),
      LOG_OUT: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth/logout",
        method: "POST",
        baseUrl,
      }),
      SIGN_UP: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth/sign-up",
        method: "POST",
        baseUrl,
      }),
      VALIDATE_OTP: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth/validate-otp",
        method: "POST",
        baseUrl,
      }),
      FORGOT_PASSWORD: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth/forgot-password",
        method: "POST",
        baseUrl,
      }),
      UPDATE_PASSWORD: createApiAction({
        pathBase: "UNSECURED_API",
        path: "/auth-updatePassword",
        method: "POST",
        baseUrl,
      }),
    },
    PRODUCTS: {
      GET_PRODUCTS: createApiAction({
        path: "/products/get-products",
        pathBase: "SECURED_API",
        method: "GET",
        baseUrl,
      }),
      CREATE_PRODUCT: createApiAction({
        path: "/products/add-product",
        pathBase: "SECURED_API",
        method: "POST",
        baseUrl,
      }),
    },
  };
};

export default APIS;
