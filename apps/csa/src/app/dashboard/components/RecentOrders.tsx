'use client'

import { Badge, Box, Flex } from '@chakra-ui/react'
import { BoxIcon, BoxContainer, CustomBadge, CommonDataTable, BaseText, CustomFormatNumber, CustomSkeletonLoader, BaseButton } from '_components/custom'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import React from 'react'
import { IoIosPaper } from 'react-icons/io'
import { OrdersModule, UsersModule } from 'bvg-innovation-state-management'
import { UTILS } from 'bvg-innovation-shared'
import { GoSync } from 'react-icons/go'

export const RecentOrders = () => {
  const cacheUser = UsersModule.UserCache.getUser()
  const {
    data: recentOrder,
    isLoading,
    refetch,
  } = OrdersModule.getStoreOrderQueries({
    payload: {
      filters: {
        storeId: cacheUser?.store?.id ?? null,
      },
    },
    queryOptions: {
      enabled: !!cacheUser?.store?.id,
    },
  })

  const columns: ColumnsDataTable[] = [
    {
      header: 'Nom',
      accessor: 'order',
      cell: (value) => {
        return <BaseText>{value?.user?.name + ' ' + value?.user?.firstName}</BaseText>
      },
    },
    {
      header: 'Quantity',
      accessor: 'quantity',
    },
    {
      header: 'Total',
      accessor: 'price',
      cell: (value) => {
        return <CustomFormatNumber value={value} />
      },
    },
    {
      header: 'Date',
      accessor: 'createdAt',
      cell: (value) => {
        return UTILS.formatCreatedAt(value)
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        return <CustomBadge status={value} />
      },
    },
  ]

  return (
    <BoxContainer>
      {isLoading ? (
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'}>
            <CustomSkeletonLoader type={'TEXT'} numberOfLines={1} width={'105px'} />
            <CustomSkeletonLoader type={'BUTTON'} width={'100px'} colorButton={'success'} />
          </Flex>
          <CustomSkeletonLoader type={'IMAGE'} height={'45px'} />
        </Flex>
      ) : (
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={4}>
            <BaseText>Commandes récente (s)</BaseText>
            <Badge rounded={'full'} p={2} bgColor={'primary.500'} color={'white'}>
              {recentOrder?.content && recentOrder?.content?.length > 1 ? `+${recentOrder?.content?.length ?? 0}  commandes` : `${recentOrder?.content?.length ?? 0} commande`}
            </Badge>
          </Flex>
          <Flex alignItems={'center'} gap={4}>
            <BaseButton onClick={() => refetch()} px={'15px'} colorType={'primary'} withGradient isLoading={isLoading} leftIcon={<GoSync />}>
              Rafraichir les donnees
            </BaseButton>
            <BoxIcon color={'secondary.500'}>
              <IoIosPaper />
            </BoxIcon>
          </Flex>
        </Flex>
      )}

      <Box p={2} w={'full'} mt={8}>
        <CommonDataTable
          data={recentOrder?.content ?? []}
          columns={columns}
          isLoading={isLoading}
          initialPage={1}
          totalItems={recentOrder?.totalPages}
          pageSize={recentOrder?.totalDataPerPage}
          hidePagination={recentOrder?.totalPages === 1}
          noDataFoundTitle={'Aucune recente commande'}
        />
      </Box>
    </BoxContainer>
  )
}
