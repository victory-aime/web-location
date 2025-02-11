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
    menuKey: "ecommerme",
    icon: ShoppingCart,
    label: "Ecommerce",
    path: APP_ROUTES.PRIVATE.HOME,
    subItems: [
      { label: "test", path: APP_ROUTES.PRIVATE.TEST, icon: ShoppingCart },
      { label: "test2", path: APP_ROUTES.PRIVATE.TEST2 },
    ],
  },
];
