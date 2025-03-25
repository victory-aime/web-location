import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Liste des routes protégées et des rôles autorisés pour chacune.
 */
const protectedRoutes: Record<string, string[]> = {
  "/private/users": ["users"],
  "/home": ["users"],
  "/private/dashboard": ["admin", "vendor"],
  "/private/ecommerce": ["admin", "vendor"],
  "/private/trash": ["admin", "vendor"],
};

/**
 * Middleware d'authentification et d'autorisation.
 *
 * Ce middleware :
 * - Vérifie si un utilisateur est authentifié via NextAuth.
 * - Extrait ses rôles depuis le token Keycloak.
 * - Vérifie s'il a accès aux routes protégées.
 * - Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
 * - Redirige vers "/unauthorized" si l'utilisateur n'a pas les permissions requises.
 *
 * @param {import("next/server").NextRequest} req - La requête entrante.
 * @returns {import("next/server").NextResponse} La réponse ou la redirection.
 */
export default withAuth(
  function middleware(req) {
    // Récupération du token depuis NextAuth
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
      signIn: "/api/auth/signin", // Redirige vers NextAuth pour la connexion
    },
  }
);

/**
 * Configuration du middleware pour matcher toutes les routes sous `/private/*`.
 */
export const config = {
  matcher: ["/private/:path*"],
};
