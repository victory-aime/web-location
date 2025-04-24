'use client'

import { Badge, Box, Flex, For, HStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { IoCalendar } from 'react-icons/io5'
import React, { useEffect, useState } from 'react'
import { VariablesColors } from '_theme/variables'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import { CommonDataTable, CardContainer, BoxContainer, CustomFormatNumber, BaseText } from '_components/custom'
import { BsSearch } from 'react-icons/bs'
import { TYPES, UTILS } from 'bvg-innovation-shared'
import { OrdersModule, UsersModule } from 'bvg-innovation-state-management'
import { hexToRGB } from '_theme/colors'
import { CiUser } from 'react-icons/ci'
import { GrMail } from 'react-icons/gr'
import { BsTelephoneForward } from 'react-icons/bs'
import { LiaMapMarkedAltSolid } from 'react-icons/lia'
import Customer from './components/Customer'
import { OrderInfo } from './components/OrderInFo'
import { RenderProductImage } from '../../products/components/RenderProductImage'
import { FormikValues } from 'formik'

interface Props {
  orderId: string
  orderQuantity?: string | number
  orderStatus?: TYPES.MODELS.PRODUCTS.OrderItemStatus | string[]
  dateAdded: string
  paymentMethod: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
}

const DetailsPage = () => {
  const user = UsersModule.UserCache.getUser()
  const orderId = useSearchParams()?.get('orderId') ?? null
  let formikReset: (() => void) | null = null
  const { data: orderDetails, isLoading } = OrdersModule.fetchOrderDetailsByStore({
    payload: {
      data: {
        orderId,
        storeId: user?.store?.id ?? null,
      },
    },
    queryOptions: {
      enabled: !!orderId && !!user?.store?.id,
    },
  })
  const { mutateAsync } = OrdersModule.updateOrderByStore({
    onSuccess: () => {
      OrdersModule.OrderCache.invalidateOrderDetails()
      OrdersModule.OrderCache.invalidateOrderList()
    },
    onError: () => {
      if (formikReset) formikReset()
    },
  })

  const [orderItemsData, setOrderItemsData] = useState<Props>({
    orderId: '',
    orderQuantity: 0,
    orderStatus: 'PENDING',
    dateAdded: '',
    paymentMethod: 'livraison',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerPhone: '',
  })

  useEffect(() => {
    if (orderId && orderDetails) {
      setOrderItemsData({
        orderId: orderId,
        orderStatus: [orderDetails?.status],
        dateAdded: orderDetails?.createdAt,
        paymentMethod: 'livraison',
        customerName: orderDetails?.user?.name + ' ' + orderDetails?.user?.firstName,
        customerEmail: orderDetails?.user?.email,
        customerAddress: orderDetails?.user?.address,
        customerPhone: orderDetails?.user?.phone,
      })
    }
  }, [orderId, orderDetails])

  const orderDetailsList = [
    {
      icon: IoCalendar,
      label: 'Date de la commande',
      value: UTILS.formatDisplayDate(orderItemsData?.dateAdded)?.toString(),
      color: VariablesColors.primary,
      bg: hexToRGB('primary', 0.1),
    },
    {
      icon: BsSearch,
      label: 'Méthode de paiement',
      value: orderItemsData?.paymentMethod,
      color: VariablesColors.primary,
      bg: hexToRGB('primary', 0.1),
    },
    {
      icon: BsSearch,
      label: 'Méthode de paiement',
      value: orderItemsData?.paymentMethod,
      color: VariablesColors.primary,
      bg: hexToRGB('primary', 0.1),
    },
    {
      icon: BsSearch,
      label: 'Méthode de paiement',
      value: orderItemsData?.paymentMethod,
      color: VariablesColors.primary,
      bg: hexToRGB('primary', 0.1),
    },
  ]

  const customerDetailsList = [
    {
      icon: CiUser,
      label: 'Nom',
      value: orderItemsData?.customerName,
      color: VariablesColors.orange,
      bg: hexToRGB('orange', 0.1),
    },
    {
      icon: GrMail,
      label: 'Email',
      value: orderItemsData?.customerEmail,
      color: VariablesColors.orange,
      bg: hexToRGB('orange', 0.1),
    },
    {
      icon: BsTelephoneForward,
      label: 'Téléphone',
      value: orderItemsData?.customerPhone,
      color: VariablesColors.orange,
      bg: hexToRGB('orange', 0.1),
    },
    {
      icon: LiaMapMarkedAltSolid,
      label: 'Adresse',
      value: orderItemsData?.customerAddress,
      color: VariablesColors.orange,
      bg: hexToRGB('orange', 0.1),
    },
  ]

  const columns: ColumnsDataTable[] = [
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />
      },
    },
    {
      header: 'Quantites',
      accessor: 'quantity',
    },
    {
      header: 'Prix',
      accessor: 'price',
    },
    {
      header: 'Total',
      accessor: 'subTotal',
      cell: (value) => {
        return <CustomFormatNumber value={value} />
      },
    },
  ]
  const updateOrderItem = async (values: FormikValues) => {
    const requestData: TYPES.MODELS.ORDERS.IUpdateOrderDto = {
      id: orderDetails?.orderItemId ?? null,
      status: values?.status && values?.status[0],
      storeId: user?.store?.id ?? null,
    }
    await mutateAsync(requestData)
  }
  const handleFormikReset = (resetFn: () => void) => {
    formikReset = resetFn
  }
  const displayContent = [
    {
      content: (
        <OrderInfo onSubmit={updateOrderItem} captureReset={handleFormikReset} orderDetailsList={orderDetailsList} orderStatus={(orderItemsData?.orderStatus && orderItemsData?.orderStatus) || []} />
      ),
    },
    {
      content: <Customer customerDetailsList={customerDetailsList} />,
    },
  ]

  return (
    <BoxContainer border={'none'} title={'Details de la commande'} description={'Gérer les détails de la commande et le statut de livraison'}>
      <Box width={'full'} mt={'30px'}>
        <HStack gap={4} flexDir={{ base: 'column', md: 'row' }} width={'full'}>
          <For each={displayContent}>
            {(item, index) => (
              <CardContainer p={4} variant={'subtle'} width={'full'} key={index} size={'lg'}>
                {item?.content}
              </CardContainer>
            )}
          </For>
        </HStack>
        <Box mt={10} width={'full'}>
          <Flex alignItems={'center'} gap={4} mb={10}>
            <BaseText>Nombre d'article</BaseText>
            <Badge rounded={'full'} p={2} bgColor={'primary.500'} color={'white'}>
              {orderDetails?.content && orderDetails?.content?.length > 1 ? `+${orderDetails?.content?.length}  articles` : `${orderDetails?.content?.length} article`}
            </Badge>
          </Flex>
          <CommonDataTable data={orderDetails?.content ?? []} columns={columns} isLoading={isLoading} initialPage={1} hidePagination />
        </Box>
      </Box>
    </BoxContainer>
  )
}

export default DetailsPage
