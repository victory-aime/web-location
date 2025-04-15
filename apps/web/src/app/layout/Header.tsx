'use client';

import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { APP_ROUTES } from '_config/routes';
import { FormTextInput } from '_components/custom/form';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, {  useEffect, useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';
import WebDisplay from '../components/WebDisplay';
import MobileMenu from '../components/MobileMenu';
import { ListMenu } from '_assets/svg';
import { TbUser } from 'react-icons/tb';
import { useCart } from '_hooks/cart';
import { CartComponents } from '../components/CartComponents';
import { BaseText, TextVariant } from '_components/custom/base-text';
import { BaseButton } from '_components/custom/button';
import BreadcrumbNav from '_components/custom/breadcrumb/BreadCrumbNav';
import { Avatar } from '_components/ui/avatar';
import { signOut, signIn } from 'next-auth/react';
import { decrypt } from '_utils/encrypt';
import { Session } from 'next-auth';
import { BsSend } from 'react-icons/bs';
import ModalInfo from '../components/ModalInfo';
import GlobalApplicationContext from '_config/globalApplicationContext'


export const Header = ({ session }: {session:Session}) => {
  const router = useRouter();
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  const [open, setOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { removeFromCart, clearCart } = useCart();
  const isLoggedIn = !!session;
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      setCart(JSON.parse(storedCart || '[]'));
    }
  }, []);

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      const decodeToken = decrypt(session.access_token);
      const decodeRefreshToken = decrypt(session.refresh_token);
      GlobalApplicationContext.setToken(decodeToken)
    }
  }, [session]);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: `${APP_ROUTES.DEFAULT_ROUTE}` }).then(()=>{
        GlobalApplicationContext.setToken('')
      });
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
                  ? router.push(APP_ROUTES.PRIVATE.PROFILE)
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
              <Avatar onClick={() => router.push(APP_ROUTES.PRIVATE.PROFILE)} />
            )}
          </Flex>
        </Flex>
        {/* Search Bar */}
        <Formik initialValues={{ search: '' }} onSubmit={(values) => router.push(`${APP_ROUTES.PUBLIC.PRODUCTS_LIST.LIST}?search=${values?.search}`)}>
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
