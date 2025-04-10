import { ShoppingCart, HomeV2, TrashIcon, StoreIcon, BagIcon } from '_assets/svg';
import { ILink } from './types';
import { APP_ROUTES } from '_/app/config/routes';

export const adminMenu: ILink[] = [
  {
    icon: HomeV2,
    label: 'Tableau de bord',
    path: APP_ROUTES.PRIVATE.HOME,
  },
  {
    label: 'Produits',
    path: APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST,
    icon: StoreIcon,
  },
  {
    label: 'Commandes',
    path: APP_ROUTES.PRIVATE.ECOMMERCE.ORDER.LIST,
    icon: BagIcon,
  },
  {
    label: 'Categories',
    path: APP_ROUTES.PRIVATE.ECOMMERCE.CATEGORY,
    icon: ShoppingCart,
  },
  {
    label: 'Corbeille',
    path: APP_ROUTES.PRIVATE.TRASH,
    icon: TrashIcon,
  },
];
