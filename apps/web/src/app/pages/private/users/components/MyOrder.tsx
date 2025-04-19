'use client'

import React from 'react'
import { Box, Flex, VStack, Stack, For } from '@chakra-ui/react'
import { OrdersModule } from 'bvg-innovation-state-management'
import { TYPES } from 'bvg-innovation-shared'
import { Session } from 'next-auth'
import { useQueryClient } from '@tanstack/react-query'
import {
  BaseButton,
  BaseText,
  BoxContainer,
  CustomBadge,
  CustomFormatNumber,
  ImageRatio,
  NoDataFound,
  TextVariant,
  TextWeight,
} from '_components/custom'

const MyOrder = ({ session }: { session: Session | null }) => {
  const queryClient = useQueryClient()
  const cacheOrder = queryClient.getQueryData<TYPES.MODELS.ORDERS.IResponseListOrder>([
    OrdersModule.constant.USERS_ORDERS_LIST,
  ])
  const { data: orders } = OrdersModule.userOrderListQueries({
    payload: {
      userId: session?.keycloakId ?? '',
    },
    queryOptions: {
      enabled: Boolean(session?.keycloakId) && !cacheOrder,
      staleTime: Infinity,
    },
  })

  return (
    <Box width={'full'}>
      {orders?.content ? (
        <BoxContainer border={'none'}>
          <For each={orders?.content}>
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
                        <Flex gap={3} mt={4} alignItems={'center'}>
                          <CustomBadge type={'order'} status={item?.status} />
                          <BaseText variant={TextVariant.S}>Votre commande est en attente de validation</BaseText>
                        </Flex>
                      </Box>

                      <VStack width={'full'} gap={5} alignItems={'flex-start'}>
                        <Stack gap={2} width={'full'}>
                          <BaseText variant={TextVariant.H3} weight={TextWeight.Medium}>
                            {item?.product?.name}
                          </BaseText>
                          <BaseText variant={TextVariant.M}>
                            Prix:
                            <CustomFormatNumber value={item?.price} />
                          </BaseText>
                          <BaseText variant={TextVariant.M}>Quantité: {item.quantity}</BaseText>
                          <Flex gap={2}>
                            <BaseText variant={TextVariant.M}>Magasin:</BaseText>
                            <BaseText color={'blue.500'} variant={TextVariant.M}>
                              {item?.store?.name}
                            </BaseText>
                          </Flex>
                        </Stack>
                        <BaseButton colorType={item.status !== 'DELIVERED' ? 'danger' : 'primary'}>
                          {item?.status === 'DELIVERED' ? 'Notez cette article' : 'Annuler la commande'}
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
  )
}

export default MyOrder
