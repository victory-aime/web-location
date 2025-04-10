'use client';

import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { APP_ROUTES } from '_/app/config/routes';
import { FormTextInput } from '_/components/custom/form';
import { Formik, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';
import WebDisplay from './WebDisplay';
import MobileMenu from './MobileMenu';
import { ListMenu } from '_assets/svg';
import { TbUser } from 'react-icons/tb';
import { useCart } from '_/app/hooks/cart';
import { CartComponents } from './CartComponents';
import { useDispatch } from 'react-redux';
import { AuthModule } from '_/store/src/modules';
import { BaseText, TextVariant } from '_/components/custom/base-text';
import { BaseButton } from '_/components/custom/button';
import BreadcrumbNav from '_/components/custom/breadcrumb/BreadCrumbNav';
import { Avatar } from '_/components/ui/avatar';
import { signOut, signIn } from 'next-auth/react';
import { decrypt } from '_/utils/encrypt';
import { Session } from 'next-auth';
import { BsSend } from 'react-icons/bs';
import ModalInfo from './ModalInfo';

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  const [open, setOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { removeFromCart, clearCart } = useCart();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isLoggedIn = !!session;

  // 1. Stockage des tokens déchiffrés
  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      const decodeToken = decrypt(session.access_token);
      const decodeRefreshToken = decrypt(session.refresh_token);
      dispatch(AuthModule.actions.setTokenKeys(decodeToken, decodeRefreshToken));
    }
  }, [session]);

  // 2. Déconnexion automatique si erreur de refresh
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
      dispatch(AuthModule.actions.clearKeys());
    }
  }, [session]);

  const removeItem = (item: { name: string; id: string }) => {
    setLoading(true);
    setTimeout(() => {
      removeFromCart(item);
      setLoading(false);
    }, 1000);
  };

  const clearAllCartItems = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 1000);
  };

  return (
    <Box>
      {/* Mobile Header */}
      <Box display={{ base: 'block', sm: 'block', lg: 'none' }}>
        <Flex m={3} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={5}>
            <IconButton bgColor="white" aria-label="menu" onClick={() => setOpen(true)}>
              <ListMenu />
            </IconButton>
            <BaseText variant={TextVariant.H3}>E-shop</BaseText>
          </Flex>
          <Flex gap={5} alignItems="center">
            <IoIosHeartEmpty
              size={22}
              onClick={() =>
                isLoggedIn
                  ? router.push(APP_ROUTES.CLIENT_PAGES.PRIVATE.PROFILE)
                  : setInfoModal(true)
              }
              cursor="pointer"
            />
            <CartComponents
              cart={cart}
              removeItem={removeItem}
              clearAllCartItems={clearAllCartItems}
              loading={loading}
            />
            {!isLoggedIn ? (
              <BaseButton
                colorType="primary"
                withGradient
                p={0}
                onClick={() =>
                  signIn('keycloak', {
                    callbackUrl: process.env.NEXTAUTH_URL,
                  })
                }
                leftIcon={<TbUser size={18} />}
              />
            ) : (
              <Avatar onClick={() => router.push(APP_ROUTES.CLIENT_PAGES.PRIVATE.PROFILE)} />
            )}
          </Flex>
        </Flex>
        {/* Search Bar */}
        <Formik initialValues={{ search: '' }} onSubmit={(values) => router.push(`${APP_ROUTES.CLIENT_PAGES.PUBLIC.PRODUCTS_LIST.LIST}?search=${values?.search}`)}>
          {({ values, handleSubmit, setFieldValue }) => (
            <Flex width="full" p={3}>
              <FormTextInput
                name="search"
                placeholder="Recherchez votre produit"
                leftAccessory={<RiSearch2Line size={24} />}
                rightAccessory={
                  <BsSend cursor="pointer" size={18} onClick={() => handleSubmit()} />
                }
                onChangeFunction={(e: any) => setFieldValue('search', e.target.value)}
                value={values.search}
              />
            </Flex>
          )}
        </Formik>
        <Box m={3}>
          <BreadcrumbNav />
        </Box>
      </Box>

      {/* Desktop Menu */}
      {responsiveMode ? (
        <WebDisplay
          cart={cart}
          setInfoModal={setInfoModal}
          isLoggedIn={isLoggedIn}
          removeItem={removeFromCart}
          clearAllCartItems={clearAllCartItems}
          loading={loading}
        />
      ) : (
        <MobileMenu open={open} onChange={() => setOpen(false)} isLoggedIn={isLoggedIn} />
      )}

      {/* Modal Connexion */}
      <ModalInfo open={infoModal} onChange={() => setInfoModal(false)} onClick={() => signIn()} />
    </Box>
  );
};

export default Header;
