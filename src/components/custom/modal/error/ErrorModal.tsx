'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { APP_ROUTES } from '_app/config/routes';
import ModalComponent from '../ModalComponent';
import { BaseText } from '../../base-text';
import { PiWarningBold } from 'react-icons/pi';
import { hexToRGB } from '_/theme/colors';
import { Session } from 'next-auth';

export default function SessionErrorModal({ session }: { session: Session }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      setShow(true);
      console.log('session error trigger', session?.error);
    }
  }, [session]);

  const handleReconnect = () => {
    signIn('keycloak', { callbackUrl: APP_ROUTES.PRIVATE.HOME });
  };

  return (
    <ModalComponent
      open={show}
      buttonCancelTitle=""
      icon={<PiWarningBold size={22} color="#f97316" />}
      iconBackroungColor={hexToRGB('orange', 0.4)}
      title={'Session Expire'}
      buttonSaveTitle="Se reconnecter"
      colorSaveButton={'primary'}
      ignoreFooter={false}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      lazyMount
      showCloseButton={false}
      onClick={handleReconnect}
    >
      <BaseText>Votre session a expiré. Veuillez vous reconnecter pour continuer.</BaseText>
    </ModalComponent>
  );
}
