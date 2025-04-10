import { Box, Flex, Stack } from '@chakra-ui/react';
import { APP_ROUTES } from '_/app/config/routes';
import { BaseButton } from '_/components/custom/button';
import { FormTextInput } from '_/components/custom/form';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';
import { CartComponents } from './CartComponents';
import { BaseText, TextVariant } from '_components/custom/base-text';
import { Avatar } from '_/components/ui/avatar';
import { signIn, signOut } from 'next-auth/react';
import { BsSend } from 'react-icons/bs';
import { MenuContent, MenuRoot, MenuTrigger } from '_/components/ui/menu';
import SwitchColorMode from '_/components/custom/switch-color/SwitchColorMode';
import { clearPersistedStorage } from '_utils/clear.store.utils';
import { useDispatch } from 'react-redux';
import { AuthModule } from '_/store/src/modules';
import { keycloakSessionLogOut } from '_hooks/logout';

const WebDisplay = ({
  cart,
  removeItem,
  clearAllCartItems,
  loading,
  isLoggedIn,
  setInfoModal,
}: {
  cart: any[];
  removeItem: (item: { id: string; name: string }) => void;
  clearAllCartItems: () => void;
  loading: boolean;
  isLoggedIn: boolean;
  setInfoModal: (value: boolean) => void;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  return (
    <Flex
      width={'full'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexDir={{ base: 'column', lg: 'row' }}
      gap={5}
      p={5}
    >
      <Box
        width={'full'}
        cursor={'pointer'}
        onClick={() => router.push(APP_ROUTES.CLIENT_PAGES.PUBLIC.HOME)}
      >
        <BaseText variant={TextVariant.L}>E-Shop</BaseText>
      </Box>

      <Formik
        initialValues={{ search: '' }}
        onSubmit={(values) =>
          router.push(
            `${APP_ROUTES.CLIENT_PAGES.PUBLIC.PRODUCTS_LIST.LIST}?search=${values?.search}`
          )
        }
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Flex width={'full'}>
            <FormTextInput
              name={'search'}
              placeholder="Recherchez votre produit"
              leftAccessory={<RiSearch2Line size={24} />}
              rightAccessory={
                <BsSend
                  cursor={'pointer'}
                  size={18}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              }
              onChangeFunction={(e: any) => {
                setFieldValue('search', e?.target.value);
              }}
              value={values?.search}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </Flex>
        )}
      </Formik>

      <Flex alignItems={'center'} justifyContent={'flex-end'} width={'full'} gap={8}>
        <Flex gap={5} alignItems={'center'} justifyContent={'center'}>
          <IoIosHeartEmpty
            size={24}
            onClick={() => {
              isLoggedIn
                ? router?.push(APP_ROUTES.CLIENT_PAGES.PRIVATE.PROFILE)
                : setInfoModal(true);
            }}
            cursor={'pointer'}
          />
          <CartComponents
            cart={cart}
            removeItem={removeItem}
            clearAllCartItems={clearAllCartItems}
            loading={loading}
          />
        </Flex>
        {!isLoggedIn ? (
          <BaseButton
            onClick={() =>
              signIn('keycloak', {
                callbackUrl: `${process.env.NEXTAUTH_URL}`,
              })
            }
            colorType={'primary'}
          >
            <BaseText variant={TextVariant.XS}>Se connecter </BaseText>
          </BaseButton>
        ) : (
          <MenuRoot>
            <MenuTrigger asChild>
              <Box position="relative" cursor={'pointer'}>
                <Avatar boxSize={'45px'} cursor={'pointer'} />
              </Box>
            </MenuTrigger>
            <MenuContent p={5} minW={'250px'}>
              <Stack gap={4} mt={4}>
                <Flex gap={3}>
                  <BsSend />
                  <BaseText
                    cursor={'pointer'}
                    onClick={() => {
                      setInfoModal(false);
                      router.push(APP_ROUTES.CLIENT_PAGES.PRIVATE.PROFILE);
                    }}
                  >
                    Mon profile
                  </BaseText>
                </Flex>
                <SwitchColorMode />

                <BaseButton
                  colorType={'danger'}
                  isLoading={logoutLoading}
                  onClick={() => {
                    keycloakSessionLogOut().then(() => {
                      signOut({ callbackUrl: process.env.NEXTAUTH_URL }).then((r) =>
                        setLogoutLoading(false)
                      );
                      setLogoutLoading(false);
                    });
                    dispatch(AuthModule.actions.clearKeys());
                    setLogoutLoading(true);
                  }}
                >
                  Deconnexion
                </BaseButton>
              </Stack>
            </MenuContent>
          </MenuRoot>
        )}
      </Flex>
    </Flex>
  );
};

export default WebDisplay;
