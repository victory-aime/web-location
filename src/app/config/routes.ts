export const APP_ROUTES = {
  PUBLIC: {
    FORGOT_PASSWORD: "/home/public/auth/forgot-password",
    LEGAL_NOTICE: "/home/public-private/legal-notice",
    TERMS_CONDITIONS: "/home/public/terms-conditions",
    SECURITY_MENTION: "/home/public-private/security-mention",
    PRODUCTS_LIST: {
      LIST: "/home/public/products",
      DETAILS: "/home/public/products/details",
      CART: {
        OVERVIEW: "/home/public/products/cart/overview",
        PROCESS: "/home/public/products/cart/process",
      },
    },
    HOME: "/home",
    SIGN_UP: "/home/public/auth/register",
    SIGN_IN: "/home/public/auth/login",
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
