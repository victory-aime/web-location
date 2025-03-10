export const APP_ROUTES = {
  PUBLIC: {
    FORGOT_PASSWORD: "/public/auth/forgot-password",
    LEGAL_NOTICE: "/public-private/legal-notice",
    SECURITY_MENTION: "/public-private/security-mention",
    PRODUCTS_LIST: {
      LIST: "/public/products",
      DETAILS: "/public/products/details",
      CHECKOUT: '/public/products/checkout'
    },
    HOME: "/",
    SIGN_UP: "/public/auth/register",
    SIGN_IN: "/public/auth/login",
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
    TRASH: "/private/trash",
  },
};
