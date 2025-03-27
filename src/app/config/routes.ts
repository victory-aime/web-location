export const APP_ROUTES = {
  PUBLIC: {
    FORGOT_PASSWORD: "/home/auth/forgot-password",
    LEGAL_NOTICE: "/home-private/legal-notice",
    TERMS_CONDITIONS: "/home/terms-conditions",
    SECURITY_MENTION: "/home-private/security-mention",
    PRODUCTS_LIST: {
      LIST: "/home/products",
      DETAILS: "/home/products/details",
      CART: {
        OVERVIEW: "/home/products/cart/overview",
        PROCESS: "/home/products/cart/process",
      },
    },
    HOME: "/home",
    SIGN_UP: "/home/auth/register",
    SIGN_IN: "/home/auth/login",
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
    CLIENT: {
      MANAGE_PROFILE: "/private/users/manage-profile",
    },
  },
};
