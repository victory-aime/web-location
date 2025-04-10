import ModalComponent from '_components/custom/modal/ModalComponent';
import { Box, Center } from '@chakra-ui/react';
import { BaseText } from '_components/custom/base-text';
import { BaseButton } from '_components/custom/button';
import { APP_ROUTES } from '_app/config/routes';
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const OrdersSuccessModal = ({
  openModal,
  onClose,
  router,
}: {
  openModal: boolean;
  onClose: (value: boolean) => void;
  router: AppRouterInstance;
}) => {
  return (
    <ModalComponent
      open={openModal}
      onChange={() => {
        onClose(!openModal);
      }}
      title={"C'est fait"}
      showCloseButton={false}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      size={'md'}
    >
      <Center flexDir={'column'} gap={4}>
        <BaseText>Votre commande est confirmée</BaseText>
        <BaseText textAlign={'center'} lineHeight={'1.8'}>
          Merci pour vos achats ! Votre commande n'a pas encore été expédiée, mais nous vous
          enverrons un email lorsque ce sera fait.
        </BaseText>
        <Box width={'full'}>
          <BaseButton
            width={'full'}
            bg={'gray'}
            onClick={() => router.push(APP_ROUTES.CLIENT_PAGES.PUBLIC.HOME)}
          >
            Revenir a l'acceuil
          </BaseButton>
          <BaseButton
            width={'full'}
            mt={2}
            colorType={'secondary'}
            onClick={() => router.push(APP_ROUTES.CLIENT_PAGES.PRIVATE.PROFILE)}
          >
            Voir vos commandes
          </BaseButton>
        </Box>
      </Center>
    </ModalComponent>
  );
};
