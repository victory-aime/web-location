import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "_/utils/auth/refresh-token";
import { encrypt } from "_/utils/encrypt";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token;
      } else {
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.access_token = encrypt(token.access_token);
      session.roles = token.decoded.realm_access.roles;
      session.id_token = encrypt(token.id_token);
      session.error = token.error;
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      //   // if (url?.startsWith("/")) {
      //   //   return `${baseUrl}/redirect`;
      //   // }
      //   // return url?.startsWith(baseUrl) ? url : baseUrl;

      //return url ? url : baseUrl;

      // Rediriger vers une page spécifique après connexion ou déconnexion
      // Si url est indéfini, on retourne directement baseUrl
      if (!url) return baseUrl;

      // Si l'url commence par /home, on ajoute le baseUrl devant
      if (url.startsWith("/home")) return `${baseUrl}${url}`;

      // Essaye de créer l'objet URL et vérifie son origine
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.origin === baseUrl) return url;
      } catch (error) {
        // En cas d'erreur (url malformée), retourne baseUrl
        return baseUrl;
      }

      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
