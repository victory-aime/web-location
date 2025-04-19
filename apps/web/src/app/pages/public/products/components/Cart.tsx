'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '_hooks/cart';
import { Box, Center, Flex, For, Image, Separator, VStack } from '@chakra-ui/react';

import { TrashIcon } from '_assets/svg';
import { BaseButton } from '_components/custom/button';
import { BaseText, TextVariant, TextWeight } from '_components/custom/base-text';
import { StepperInput } from '_components/ui/stepper-input';
import CustomFormatNumber from '_components/custom/format-number/CustomFormatNumber';
import { APP_ROUTES } from '_config/routes';
import { useRouter } from 'next/navigation';
import { ImageRatio } from '_components/custom/aspect-ratio';
import { signIn, useSession } from 'next-auth/react';

const Cart = () => {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    cart,
    fetchCartFromStorage,
    setCart,
    triggerRefresh,
    removeFromCart,
    calculateTotalPrice,
  } = useCart();
  useEffect(() => {
    fetchCartFromStorage().then((data) => {
      setCart(data);
    });
    setLoading(false);
  }, [triggerRefresh]);

  if (cart?.length === 0) {
    return (
      <>
        <Box mt={50} padding={{ base: 5, lg: 10 }}>
          <Box width={'full'} boxShadow={'lg'} borderRadius={'7px'} p={4}>
            <Center flexDir={'column'} gap={4}>
              <Image
                src={'/assets/images/cart/cart.jpg'}
                alt={'cart-empty'}
                width={'200px'}
                height={'200px'}
              />
              <BaseText>Votre panier est vide!</BaseText>
              <BaseText>Parcourez nos catégories et découvrez nos meilleures offres!</BaseText>
              <BaseButton
                colorType={'secondary'}
                onClick={() => router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.LIST)}
              >
                <BaseText variant={TextVariant.S}>Commencez vos achats</BaseText>
              </BaseButton>
            </Center>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box mt={50} padding={{ base: 5, lg: 10 }} width={'full'}>
        <Flex gap={10} mt={5} flexDir={{ base: 'column', lg: 'row' }} width={'full'}>
          <Box width={'full'} boxShadow={'lg'} borderRadius={'7px'} p={4}>
            <BaseText variant={TextVariant.H3}>Cart ({cart?.length})</BaseText>
            <Separator mt={2} />
            <For each={cart}>
              {(item, index) => (
                <Box key={index} width={'full'} mt={6}>
                  <Flex
                    gap={5}
                    alignItems={'flex-start'}
                    justifyContent={'space-between'}
                    width={'full'}
                  >
                    <Flex alignItems={'flex-start'} gap={3} width={'full'}>
                      <Box mb={4} width={'full'}>
                        <ImageRatio image={item?.images[0]} />
                      </Box>
                      <VStack gap={2} width={'full'} alignItems={'flex-start'}>
                        <BaseText flexWrap={'wrap'} variant={TextVariant.S}>
                          {item?.name}
                        </BaseText>
                        <BaseText variant={TextVariant.S}>Vendeur : Test</BaseText>
                        <BaseText variant={TextVariant.S} weight={TextWeight.Regular}>
                          {item.stock <= 5
                            ? 'Quelques aticles restant'
                            : 'Ne manquez pas cet article'}
                        </BaseText>
                      </VStack>
                    </Flex>
                    <Flex justifyContent={'flex-start'} alignItems={'flex-start'}>
                      <BaseText variant={TextVariant.M} fontWeight={TextWeight.Regular}>
                        <CustomFormatNumber value={item?.price} />
                      </BaseText>
                    </Flex>
                  </Flex>
                  <Flex justifyContent={'space-between'}>
                    <BaseButton
                      colorType={'danger'}
                      withGradient
                      leftIcon={<TrashIcon fill={'#fff'} />}
                      onClick={() => {
                        removeFromCart(item);
                        setLoading(true);
                      }}
                      isLoading={loading}
                    >
                      <BaseText variant={TextVariant.XS}>Delete</BaseText>
                    </BaseButton>
                    <StepperInput
                      defaultValue={item?.quantity?.toString()}
                      min={1}
                      max={item?.stock}
                      disabled={false}
                      onValueChange={(e) => console.log(e.value as unknown as number)}
                    />
                  </Flex>
                  {cart?.length > 2 && <Separator mt={3} mb={3} />}
                </Box>
              )}
            </For>
          </Box>

          <Box
            width={{ base: 'full', lg: '1/2' }}
            height={'fit-content'}
            boxShadow={'lg'}
            borderRadius={'7px'}
          >
            <Box>
              <BaseText p={2} textTransform={'uppercase'}>
                Cart resume
              </BaseText>
              <Separator />
              <Box p={2}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <BaseText>Sous-total</BaseText>
                  <BaseText variant={TextVariant.H3}>
                    <CustomFormatNumber value={calculateTotalPrice(cart)} />
                  </BaseText>
                </Flex>
                <BaseText variant={TextVariant.XS} mt={1}>
                  Frais de livraison non inclus à ce stade.
                </BaseText>
              </Box>
              <Separator />
              <Box p={2} width={'full'} mt={8}>
                <BaseButton
                  colorType={'secondary'}
                  withGradient
                  width={'full'}
                  onClick={() => {
                    if (status === 'unauthenticated') {
                      signIn('keycloak', {
                        callbackUrl: APP_ROUTES.PUBLIC.PRODUCTS_LIST.CART.PROCESS,
                      }).then((r) => console.log('response', r));
                    } else {
                      router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.CART.PROCESS);
                    }
                  }}
                >
                  Commander(
                  <CustomFormatNumber value={calculateTotalPrice(cart)} />)
                </BaseButton>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Cart;
