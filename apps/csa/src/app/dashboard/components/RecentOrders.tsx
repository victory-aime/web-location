'use client'

import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import { BoxIcon, BoxContainer, CustomBadge, CommonDataTable } from '_components/custom'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import React from 'react'
import { IoIosPaper } from 'react-icons/io'
import { totalRecentOrders } from './data/data'

export const RecentOrders = () => {
  const columsData: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    { header: 'Nom', accessor: 'name' },
    {
      header: 'Catégorie',
      accessor: 'category',
    },
    {
      header: 'status',
      accessor: 'status',
      cell: (value) => {
        return <CustomBadge status={value} />
      },
    },
    {
      header: 'Prix',
      accessor: 'price',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          title: 'edit les value',
          handleClick: (value) => console.log('value clicked', value),
        },
        {
          name: 'view',
          handleClick: (value) => console.log('value clicked', value),
        },
        {
          name: 'delete',
          handleClick: (value) => console.log('value clicked', value),
        },
      ],
    },
  ]
  return (
    <BoxContainer>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={4}>
          <Text>Recent Orders</Text>
          <Badge rounded={'full'} p={2} bgColor={totalRecentOrders.orders > 0 ? 'primary.500' : 'gray.400'}>
            <Text color={'white'}>+{totalRecentOrders.orders} orders</Text>
          </Badge>
        </Flex>
        <BoxIcon color={'secondary.500'}>
          <IoIosPaper />
        </BoxIcon>
      </Flex>
      <Box p={2} w={'full'} mt={8}>
        <CommonDataTable data={totalRecentOrders.ordersTable} columns={columsData} hidePagination />
      </Box>
    </BoxContainer>
  )
}
