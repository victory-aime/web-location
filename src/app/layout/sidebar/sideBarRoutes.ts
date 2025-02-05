import { HomeIcon } from "_assets/svg";
import { ILink } from "./types";
import { APP_ROUTES } from "_/app/config/routes";

export const adminMenu: ILink[] = [
  {
    icon: HomeIcon,
    label: "Home",
    path: APP_ROUTES.PRIVATE.DASH,
  },
  {
    menuKey: "test",
    icon: HomeIcon,
    label: "Home 2",
    path: APP_ROUTES.PRIVATE.HOME,
    subItems: [{ label: "test", path: APP_ROUTES.PRIVATE.TEST }],
  },
];
