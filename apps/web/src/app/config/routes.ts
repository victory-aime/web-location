export const APP_ROUTES = {
  DEFAULT_ROUTE: '/',
    PRIVATE: {
      PROFILE: '/pages/private/users/manage-profile',
    },
    PUBLIC: {
      TERMS_CONDITIONS: '/pages/public/terms-conditions',
      PRODUCTS_LIST: {
        LIST: '/pages/public/products',
        DETAILS: '/pages/public/products/details',
        CART: {
          OVERVIEW: '/pages/public/products/cart/overview',
          PROCESS: '/pages/public/products/cart/process',
        },
      },
      HOME: '/pages/public',
      SIGN_UP: '/pages/public/auth/register',
    },

};
