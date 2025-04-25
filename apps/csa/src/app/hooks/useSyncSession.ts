import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { decrypted } from '_utils/crypt'
import { globalApplicationContext } from '_config/globalState'

export const useSyncTokensWithContext = () => {
  const { data: session } = useSession()
  const lastAccessTokenRef = useRef<string | null>(null)

  useEffect(() => {
    if (!session?.access_token || !session?.refresh_token) return

    const accessToken = decrypted(session.access_token)
    const refreshToken = decrypted(session.refresh_token)

    if (accessToken !== lastAccessTokenRef.current) {
      globalApplicationContext.setToken(accessToken)
      globalApplicationContext.setRefreshToken(refreshToken)
      lastAccessTokenRef.current = accessToken
    }
  }, [session])
}
