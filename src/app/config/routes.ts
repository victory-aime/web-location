export const APP_ROUTES = {
  CLIENT_PAGES: {
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
  },

  PRIVATE: {
    HOME: '/dashboard',
    ECOMMERCE: {
      ORDER: {
        LIST: '/dashboard/ecommerce/order',
        DETAILS: '/dashboard/ecommerce/order/details',
      },
      CATEGORY: '/dashboard/ecommerce/category',
      PRODUCTS: {
        LIST: '/dashboard/ecommerce/products',
        ADD: '/dashboard/ecommerce/products/addproduct',
      },
    },
    TRASH: '/dashboard/trash',
    CLIENT: {
      MANAGE_PROFILE: '/dashboard/users/manage-profile',
    },
  },
};
