'use client'
import { Center, Spinner } from '@chakra-ui/react'
import { APP_ROUTES } from '_config/routes'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignInPage() {
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME
  const router = useRouter()
  const { data: session } = useSession()
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    if (!session?.access_token) {
      signIn('keycloak', { callbackUrl })
        .then(() => setLoader(false))
        .catch((error) => console.error('error', error))
    } else {
      router.push(APP_ROUTES.HOME)
    }
  }, [session, router])

  return (
    <Center h={'100vh'} w={'100vw'}>
      {loader && <Spinner animationDuration="0.4s" size={'xl'} color={'primary.500'} borderWidth={'3px'} />}
    </Center>
  )
}
