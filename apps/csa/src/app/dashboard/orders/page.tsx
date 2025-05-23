'use client'

import React from 'react'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import { CustomBadge, CustomFormatNumber, BaseText, CommonDataTable, BoxContainer } from '_components/custom'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '_config/routes'
import { UsersModule, OrdersModule } from 'bvg-innovation-state-management'
import { UTILS } from 'bvg-innovation-shared'
import { RenderProductImage } from '../products/components/RenderProductImage'
import { Box } from '@chakra-ui/react'

const OrderListPage = () => {
  const router = useRouter()
  const user = UsersModule.UserCache.getUser()
  const {
    data: storeOrderList,
    isLoading,
    refetch,
  } = OrdersModule.getStoreOrderQueries({
    payload: {
      filters: { storeId: user?.store?.id ?? null },
    },
    queryOptions: {
      enabled: !!user?.store?.id,
    },
  })

  const columns: ColumnsDataTable[] = [
    { header: 'Numero de la commande', accessor: 'orderId' },
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />
      },
    },
    {
      header: 'Client',
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
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => {
            router.push(`${APP_ROUTES.ORDER.DETAILS}?orderId=${value?.orderId}`)
          },
        },
      ],
    },
  ]

  return (
    <BoxContainer
      border={'none'}
      title="Liste des commandes"
      description="consultez vos commandes"
      loader={isLoading}
      numberOfLines={2}
      withActionButtons
      actionsButtonProps={{
        isLoading,
        onReload: () => {
          refetch()
        },
      }}
    >
      <Box mt={'30px'}>
        <CommonDataTable
          data={storeOrderList?.content}
          columns={columns}
          isLoading={isLoading}
          initialPage={1}
          totalItems={storeOrderList?.totalPages}
          pageSize={storeOrderList?.totalDataPerPage}
          hidePagination={storeOrderList?.totalPages === 1}
          lazy={false}
        />
      </Box>
    </BoxContainer>
  )
}

export default OrderListPage
