import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessToken } from '_utils/auth'
import { encrypt } from '_utils/encrypt'

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000)

      if (account) {
        token.decoded = jwtDecode(account.access_token)
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.expires_at = account.expires_at
        token.refresh_token = account.refresh_token
        token.sub = account?.sub
        return token
      } else if (nowTimeStamp < token.expires_at - 180) {
        return token
      } else {
        console.log('Token has expired. Will refresh...')
        try {
          const refreshedToken = await refreshAccessToken(token?.refresh_token)
          console.log('....Token is refreshed.')
          return {
            ...token,
            access_token: refreshedToken.access_token,
            refresh_token: refreshedToken.refresh_token,
            id_token: refreshedToken.id_token,
            expires_at: refreshedToken.expires_at,
            decoded: jwtDecode(refreshedToken.access_token),
          }
        } catch (error) {
          console.error('Error refreshing access token', error)
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.access_token = token.access_token ? encrypt(token.access_token) : null
      session.refresh_token = token.refresh_token ? encrypt(token.refresh_token) : null
      session.id_token = token.id_token ? encrypt(token.id_token) : null
      session.roles = token.decoded?.realm_access?.roles ?? []
      session.keycloakId = token.decoded?.sub ?? null
      session.error = token.error
      return session
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (!url) return baseUrl
      if (url.startsWith('/pages')) return `${baseUrl}${url}`
      try {
        const parsedUrl = new URL(url)
        if (parsedUrl.origin === baseUrl) return url
      } catch {
        // Ensure a string is always returned
        return baseUrl
      }
      return baseUrl // Fallback to baseUrl if no other condition is met
    },
    pages: {
      signIn: '/pages/public/auth/signin', // Redirect to the sign-in page
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
