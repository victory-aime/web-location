import { APP_ROUTES } from '../config/routes';

export const getRedirectRoute = (roles: string[]) => {
  if (roles.includes('vendor') ?? roles.includes('admin')) return APP_ROUTES.PRIVATE.HOME;
  return APP_ROUTES.CLIENT_PAGES.PUBLIC.HOME;
};
