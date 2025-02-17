import { ShoppingCart, HomeV2 } from "_assets/svg";
import { ILink } from "./types";
import { APP_ROUTES } from "_/app/config/routes";

export const adminMenu: ILink[] = [
  {
    icon: HomeV2,
    label: "Home",
    path: APP_ROUTES.PRIVATE.DASH,
  },
  {
    menuKey: "ecommerce",
    icon: ShoppingCart,
    label: "Ecommerce",
    path: APP_ROUTES.PRIVATE.HOME,
    subItems: [
      {
        label: "Products",
        path: APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST,
        icon: ShoppingCart,
      },
      { label: "Orders", path: APP_ROUTES.PRIVATE.ECOMMERCE.ORDER },
      { label: "Categorie", path: APP_ROUTES.PRIVATE.ECOMMERCE.CATEGORY },
    ],
  },
];
