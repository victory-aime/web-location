import { Center, Group } from '@chakra-ui/react'
import { BaseText, TextVariant } from '_components/custom/base-text'
import { BaseButton } from '_components/custom/button'
import { ModalComponent } from '_components/custom/modal'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { APP_ROUTES } from '_config/routes'

interface ModalProps {
  open: boolean
  onChange: (value: boolean) => void
  onClick: () => void
}

const ModalInfo: FC<ModalProps> = ({ open, onChange, onClick }) => {
  const router = useRouter()
  return (
    <ModalComponent title="Information" open={open} onChange={() => onChange(false)}>
      <Center flexDir="column" gap={5}>
        <BaseText variant={TextVariant.L} textAlign="center" lineHeight={1.5}>
          Vous devez vous connecter pour accéder à cette fonctionnalité
        </BaseText>
        <Group width="full" gap={5} flexDir="column">
          <BaseButton
            width="full"
            colorType="primary"
            withGradient
            onClick={() => {
              onClick()
              onChange(false)
            }}
          >
            <BaseText>Se connecter</BaseText>
          </BaseButton>
          <BaseButton
            width="full"
            colorType="secondary"
            withGradient
            onClick={() => {
              router.push(APP_ROUTES.PUBLIC.SIGN_UP)
              onChange(false)
            }}
          >
            <BaseText>Créer un compte</BaseText>
          </BaseButton>
        </Group>
      </Center>
    </ModalComponent>
  )
}

export default ModalInfo
