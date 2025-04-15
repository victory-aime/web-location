'use client';

import React, { useEffect } from 'react';
import { Box, Flex, VStack, Stack, For } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { OrdersModule } from '_/store/src/modules';
import BoxContainer from '_/components/custom/container/BoxContainer';
import { BaseButton } from '_/components/custom/button';
import ImageRatio from '_/components/custom/aspect-ratio/ImageRatio';
import { BaseText, TextVariant, TextWeight } from '_/components/custom/base-text';
import { CustomFormatNumber } from '_/components/custom/format-number';
import { CustomBadge } from '_/components/custom/badge';
import { useDispatch } from 'react-redux';
import { Session } from 'next-auth';
import NoDataFound from '_/components/custom/no-data-found/NoDataFound';

const MyOrder = ({ session }: { session: Session | null }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(OrdersModule.selectors.ordersSelector);

  const fetchUserOrderList = async () => {
    dispatch(
      OrdersModule.actions.userOrdersList({
        userId: session?.keycloakId ?? '',
      })
    );
  };

  useEffect(() => {
    if (orders?.length === 0 && session?.keycloakId) {
      fetchUserOrderList();
    }
  }, [session?.keycloakId]);

  return (
    <Box width={'full'}>
      {orders?.length > 0 ? (
        <BoxContainer  border={'none'}>
          <For each={orders}>
            {(order, orderIndex) => (
              <Box key={orderIndex} width={'full'}>
                <For each={order?.items}>
                  {(item: any, itemIndex: number) => (
                    <Flex
                      key={itemIndex}
                      gap={4}
                      mb={4}
                      flexDir={{ base: 'column', md: 'row' }}
                      alignItems={'flex-start'}
                      justifyContent={'space-between'}
                      width={'full'}
                    >
                      <Box width={'full'} position={'relative'}>
                        <ImageRatio image={item?.product?.image} ratio={{ base: 1, md: 16 / 9 }} />
                        <Flex gap={3} mt={4}>
                          <CustomBadge type={'order'} status={order?.status} />
                          <BaseText variant={TextVariant.S}>
                            Votre commande est en attente de validation
                          </BaseText>
                        </Flex>
                      </Box>

                      <VStack width={'full'} gap={5} alignItems={'flex-start'}>
                        <Stack gap={2} width={'full'}>
                          <BaseText variant={TextVariant.H3} weight={TextWeight.Medium}>
                            {item?.product?.name}
                          </BaseText>
                          <BaseText variant={TextVariant.M}>
                            Prix:
                            <CustomFormatNumber value={item?.product?.productPrice} />
                          </BaseText>
                          <BaseText variant={TextVariant.M}>Quantité: {item.quantity}</BaseText>
                          <Flex gap={2}>
                            <BaseText variant={TextVariant.M}>Magasin:</BaseText>
                            <BaseText color={'blue.500'} variant={TextVariant.M}>
                              {item?.store?.name}
                            </BaseText>
                          </Flex>
                        </Stack>
                        <BaseButton colorType={order?.status === 'NEW' ? 'danger' : 'primary'}>
                          {order?.status !== 'NEW' ? 'Notez cette article' : 'Annuler la commande'}
                        </BaseButton>
                      </VStack>
                    </Flex>
                  )}
                </For>
              </Box>
            )}
          </For>
        </BoxContainer>
      ) : (
        <NoDataFound />
      )}
    </Box>
  );
};

export default MyOrder;
