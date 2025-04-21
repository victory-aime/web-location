'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { PiWarningBold } from 'react-icons/pi'
import { BaseText, ModalComponent } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { keycloakSessionLogOut } from '_hooks/logout'
import { globalApplicationContext } from '_config/globalState'

export const SessionErrorModal = () => {
  const [showSessionError, setShowSessionError] = useState(false)
  useEffect(() => {
    globalApplicationContext.setSessionErrorHandler(() => {
      setShowSessionError(true)
    })
  }, [])
  const [loading, setLoading] = useState(false)

  const handleReconnect = () => {
    signIn('keycloak').then(() => {})
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
