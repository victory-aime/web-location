'use client';
import { Badge, Box, Flex, For, HStack } from '@chakra-ui/react';
import BoxContainer from '_components/custom/container/BoxContainer';
import { useSearchParams } from 'next/navigation';
import { IoCalendar } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import { VariablesColors } from '_theme/variables';
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types';
import { RenderProductImage } from '../../products/components';
import { CommonDataTable } from '_components/custom/data-table';
import { CardContainer } from '_components/custom/card/CardContainer';
import { BsSearch } from 'react-icons/bs';
import { TYPES, UTILS } from '_/store/src';
import { useSelector } from 'react-redux';
import { OrdersModule, UsersModule } from '_store/src/modules';
import { CustomFormatNumber } from '_components/custom/format-number';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { BaseText } from '_components/custom/base-text';
import { hexToRGB } from '_theme/colors';
import { CiUser } from 'react-icons/ci';
import { GrMail } from 'react-icons/gr';
import { BsTelephoneForward } from 'react-icons/bs';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
import Customer from './components/Customer';
import { OrderClientInfo } from './components/OrderClientInFo';

interface Props {
  orderId: string;
  orderQuantity?: string | number;
  orderStatus?: TYPES.MODELS.PRODUCTS.OrderStatus | string[];
  dateAdded: string;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

const DetailsPage = () => {
  const dispatch = useDispatch();
  const orderItemId = useSearchParams()?.get('orderItemId');
  const { storeOrderList, loading, orderActions } = useSelector(
    OrdersModule.selectors.ordersSelector
  );
  const { user } = useSelector(UsersModule.selectors.userSelector);
  const extractItem = UTILS.findDynamicIdInList(orderItemId ?? '', storeOrderList);
  const [orderItemsData, setOrderItemsData] = useState<Props>({
    orderId: '',
    orderQuantity: 0,
    orderStatus: 'NEW',
    dateAdded: '',
    paymentMethod: 'livraison',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerPhone: '',
  });

  useEffect(() => {
    if (orderItemId && extractItem) {
      setOrderItemsData({
        orderId: extractItem?.orderId,
        orderQuantity: extractItem?.quantity,
        orderStatus: [extractItem?.order?.status],
        dateAdded: extractItem?.order?.createdAt,
        paymentMethod: 'livraison',
        customerName: extractItem?.order?.user?.name + ' ' + extractItem?.order?.user?.firstName,
        customerEmail: extractItem?.order?.user?.email,
        customerAddress: extractItem?.order?.user?.address,
        customerPhone: extractItem?.order?.user?.phone,
      });
    }
  }, [orderItemId, extractItem]);

  useEffect(() => {
    if (isEmpty(storeOrderList?.content) && orderItemId && user?.store?.id) {
      dispatch(
        OrdersModule.actions.getStoreOrderListRequestAction({
          storeId: user?.store?.id,
          id: orderItemId,
        })
      );
    }
  }, [orderItemId, user?.store?.id]);

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
  ];

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
  ];

  const columns: ColumnsDataTable[] = [
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />;
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
      accessor: 'order',
      cell: (value) => {
        return <CustomFormatNumber value={value?.totalPrice} />;
      },
    },
  ];

  useEffect(() => {
    if (orderActions) {
      dispatch(
        OrdersModule.actions.getStoreOrderListRequestAction({
          storeId: user?.store?.id,
        })
      );
      dispatch(OrdersModule.actions.clearOrdersActionsKeys());
    }
  }, [orderActions]);

  const dataObject = [
    {
      content: (
        <OrderClientInfo
          orderDetailsList={orderDetailsList}
          orderItemId={orderItemId ?? ''}
          storeId={extractItem?.storeId}
          orderStatus={(orderItemsData?.orderStatus && orderItemsData?.orderStatus) || []}
        />
      ),
    },
    {
      content: <Customer customerDetailsList={customerDetailsList} />,
    },
  ];

  return (
    <BoxContainer
      border={'none'}
      title={'Details de la commande'}
      description={'Gérer les détails de la commande et le statut de livraison'}
    >
      <Box width={'full'} mt={'30px'}>
        <HStack gap={4} flexDir={{ base: 'column', md: 'row' }} width={'full'}>
          <For each={dataObject}>
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
              {storeOrderList?.content?.length > 1
                ? `+${storeOrderList?.content?.length}  articles`
                : `${storeOrderList?.content?.length} article`}
            </Badge>
          </Flex>
          <CommonDataTable
            data={storeOrderList?.content}
            columns={columns}
            isLoading={loading}
            hidePagination
            lazy
          />
        </Box>
      </Box>
    </BoxContainer>
  );
};

export default DetailsPage;
