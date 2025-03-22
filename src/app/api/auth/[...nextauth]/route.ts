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
      issuer: `${process.env.KEYCLOAK_ISSEUR}`,
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
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
