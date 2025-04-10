import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Routes protégées et rôles associés
const protectedRoutes: Record<string, string[]> = {
  '/dashboard': ['admin', 'vendor'],
  '/pages': ['users'],
};

export default withAuth(
  function middleware(req) {
    const token: any = req.nextauth?.token;

    // Vérifie si le token est disponible (utilisateur authentifié)
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // Extraction des rôles de l'utilisateur depuis Keycloak
    const userRoles: string[] = Array.isArray(
      token.decoded?.realm_access?.roles
    )
      ? token.decoded.realm_access.roles
      : [];

    const pathname = req.nextUrl.pathname;

    // Vérifie l'accès aux routes protégées
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
        if (!hasAccess) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    // Autorise l'accès à la route
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Callback qui vérifie si un token est présent.
       * @param {{ token: any }} param - Objet contenant le token.
       * @returns {boolean} Retourne `true` si le token existe.
       */
      authorized: ({ token }: { token: any }): boolean => !!token,
    },
    pages: {
      signIn: '/', // Redirige vers NextAuth pour la connexion
    },
  }
);

// ✅ On match uniquement les routes sensibles
export const config = {
  matcher: ['/dashboad/:path*', '/pages/private/:path*'], // On n'inclut PAS les pages publiques ici
};
