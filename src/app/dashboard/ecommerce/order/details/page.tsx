'use client';
import { Badge, Box, Flex, For, HStack, VStack } from '@chakra-ui/react';
import { APP_ROUTES } from '_app/config/routes';
import { CustomBadge } from '_components/custom/badge';
import { ActionsButton, BaseButton } from '_components/custom/button';
import BoxContainer from '_components/custom/container/BoxContainer';
import { useSearchParams } from 'next/navigation';
import { IoCalendar } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import { VariablesColors } from '_theme/variables';
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types';
import { RenderProductImage } from '../../products/components';
import { CommonDataTable } from '_components/custom/data-table';
import { BoxIcon } from '_components/custom/boxIcon';
import { CardContainer } from '_components/custom/card/CardContainer';
import { BsSearch } from 'react-icons/bs';
import { TYPES, UTILS } from '_/store/src';
import { useSelector } from 'react-redux';
import { OrdersModule, UsersModule } from '_store/src/modules';
import { CustomFormatNumber } from '_components/custom/format-number';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { BaseText, TextVariant } from '_components/custom/base-text';
import { hexToRGB } from '_theme/colors';
import { CiUser } from 'react-icons/ci';
import { GrMail } from 'react-icons/gr';
import { BsTelephoneForward } from 'react-icons/bs';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
import { Formik, FormikValues } from 'formik';
import { FormSelect } from '_/components/custom/form';
import CustomToolTip from '_/components/custom/tooltip/CustomTooltip';
import Customer from './components/Customer';

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
  const [edit, setEdit] = useState<boolean>(false);
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

  console.info('values', extractItem);

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
      header: 'Total produits',
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

  const updateOrder = (values: FormikValues) => {
    dispatch(
      OrdersModule.actions.updateOrderStore({
        id: orderItemId,
        storeId: extractItem?.storeId,
        status: values?.status && values?.status[0],
      })
    );
  };

  useEffect(() => {
    if (orderActions) {
      dispatch(
        OrdersModule.actions.getStoreOrderListRequestAction({
          storeId: user?.store?.id,
        })
      );
    }
  }, [orderActions]);

  const dataObject = [
    {
      content: (
        <Box width={'full'}>
          <Formik
            enableReinitialize
            initialValues={{ status: orderItemsData?.orderStatus }}
            onSubmit={updateOrder}
          >
            {({ setFieldValue, resetForm, handleSubmit, dirty }) => (
              <Flex
                gap={3}
                width={'full'}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{ base: 'column', lg: 'row' }}
              >
                <Flex
                  width={'full'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  flexDir={{ base: 'column', lg: 'row' }}
                >
                  <BaseText variant={TextVariant.H2}>Commande {'#452130'}</BaseText>
                  <Flex
                    width={{ base: 'full', lg: '200px' }}
                    alignItems={'flex-end'}
                    justifyContent={'flex-end'}
                  >
                    <FormSelect
                      name="status"
                      isClearable={false}
                      isDisabled={!edit}
                      listItems={TYPES.FUNCTIONS.SELECT_COLLECTION.statusOrdersList()}
                      setFieldValue={setFieldValue}
                      customRenderSelected={(selectedItems) => (
                        <>
                          {selectedItems.map((item) => (
                            <CustomBadge width={'full'} key={item.value} status={item.value} />
                          ))}
                        </>
                      )}
                    />
                  </Flex>
                </Flex>
                <Flex width={'1/2'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  {edit ? (
                    <Flex gap={2}>
                      <BaseButton
                        colorType={'danger'}
                        withGradient
                        onClick={() => {
                          resetForm();
                          setEdit(false);
                        }}
                      >
                        annuler
                      </BaseButton>
                      <BaseButton
                        disabled={!dirty}
                        colorType={'success'}
                        withGradient
                        onClick={() => {
                          setEdit(false);
                          handleSubmit();
                        }}
                      >
                        valider
                      </BaseButton>
                    </Flex>
                  ) : (
                    <CustomToolTip message={'Clicquer pour modifier le status de la livraison'}>
                      <MdEdit size={24} cursor={'pointer'} onClick={() => setEdit(true)} />
                    </CustomToolTip>
                  )}
                </Flex>
              </Flex>
            )}
          </Formik>
          <VStack gap={3} mt={5}>
            {orderDetailsList.map((item, index) => (
              <HStack
                key={index}
                width={'full'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                  <BoxIcon borderRadius={'7px'} color={item.bg}>
                    <item.icon color={item.color} />
                  </BoxIcon>
                  <BaseText>{item.label}</BaseText>
                </Flex>
                <BaseText>{item.value}</BaseText>
              </HStack>
            ))}
          </VStack>
        </Box>
      ),
    },
    {
      content: <Customer customerDetailsList={customerDetailsList} />,
    },
  ];

  return (
    <>
      <ActionsButton
        mt={25}
        cancelTitle={'Retour'}
        cancelColor="primary"
        goBackUrl={APP_ROUTES.PRIVATE.ECOMMERCE.ORDER.LIST}
      />
      <BoxContainer
        mt={25}
        border={'none'}
        title={'Details de la commande'}
        description={
          'hfsohgfwogfhwklhgouyghwo ghuhugf9wtgow wgft798wtgrw vhgsdvboyre9oighw89re7og guiywfgiuw futgwe87ft u9tf78wet rf78wt rt87wtf w 78te87tew 9 tfe8rwtf 9wtf 9'
        }
      >
        <Box width={'full'} mt={'30px'}>
          <HStack gap={4} flexDir={{ base: 'column', md: 'row' }} width={'full'}>
            <For each={dataObject}>
              {(item, index) => (
                <CardContainer variant={'subtle'} width={'full'} key={index} size={'lg'}>
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
    </>
  );
};

export default DetailsPage;
