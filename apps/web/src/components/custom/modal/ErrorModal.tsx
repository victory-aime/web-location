'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { PiWarningBold } from 'react-icons/pi'
import { BaseText, ModalComponent } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { keycloakSessionLogOut } from '_hooks/logout'
import { Session } from 'next-auth'

export const SessionErrorModal = ({ session }: { session: Session | null }) => {
  const [showSessionError, setShowSessionError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      setShowSessionError(true)
    }
  }, [session])

  const handleReconnect = () => {
    signIn('keycloak').then(() => {
      setLoading(false)
    })
    setLoading(true)
  }

  return (
    <ModalComponent
      open={showSessionError}
      buttonCancelTitle="Se Deconnecter"
      onChange={() =>
        keycloakSessionLogOut().then(() => {
          setLoading(true)
        })
      }
      icon={<PiWarningBold size={22} color="#f97316" />}
      iconBackroungColor={hexToRGB('orange', 0.4)}
      title={'Session Expire'}
      buttonSaveTitle="Se reconnecter"
      colorSaveButton={'primary'}
      ignoreFooter={false}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      lazyMount
      isLoading={loading}
      showCloseButton={false}
      onClick={handleReconnect}
    >
      <BaseText>Votre session a expiré. Veuillez vous reconnecter pour continuer.</BaseText>
    </ModalComponent>
  )
}
