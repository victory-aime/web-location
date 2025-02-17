export const APP_ROUTES = {
  PUBLIC: {
    FORGOT_PASSWORD: "/auth/forgot-password",
    LEGAL_NOTICE: "/public-private/legal-notice",
    SECURITY_MENTION: "/public-private/security-mention",
    SIGN_UP: "/auth/register",
    SIGN_IN: "/auth/login",
  },
  PRIVATE: {
    HOME: "/",
    DASH: "/private/dashboard",
    ECOMMERCE: {
      ORDER: {
        LIST: "/private/ecommerce/order",
        DETAILS: "/private/ecommerce/order/details",
      },
      CATEGORY: "/private/ecommerce/category",
      PRODUCTS: {
        LIST: "/private/ecommerce/products",
        ADD: "/private/ecommerce/products/addproduct",
      },
    },
  },
};
