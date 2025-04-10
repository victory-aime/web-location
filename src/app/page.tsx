'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getRedirectRoute } from './hooks/dynamic-redirect';
import { APP_ROUTES } from './config/routes';
import { authOptions } from '_app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirection serveur vers page publique
    return redirect(APP_ROUTES.CLIENT_PAGES.PUBLIC.HOME);
  }

  // Récupération des rôles
  const userRoles = session.roles || [];

  // Redirection vers la page correspondante
  return redirect(getRedirectRoute(userRoles));
}
