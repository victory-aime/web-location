'use client';

import { Box, Flex, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import { CustomBadge } from '_/components/custom/badge';
import { BaseText, TextVariant } from '_/components/custom/base-text';
import { BoxIcon } from '_/components/custom/boxIcon';
import { BaseButton } from '_/components/custom/button';
import { FormSelect } from '_/components/custom/form';
import {CustomToolTip} from '_/components/custom/tooltip/CustomTooltip';
import { TYPES } from '_/store/src';
import { OrdersModule } from '_/store/src/modules';
import { Formik, FormikValues } from 'formik';
import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import OrderClientMobileDisplay from './OrderClientMobileDisplay';
import { IoCheckbox, IoCloseCircle } from 'react-icons/io5';

export const OrderClientInfo = ({
  orderStatus,
  storeId,
  orderItemId,
  orderDetailsList,
}: {
  orderDetailsList: any[];
  orderItemId: string;
  storeId: string;
  orderStatus: TYPES.MODELS.PRODUCTS.OrderStatus | string[];
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const responsive = useBreakpointValue({ base: false, lg: true });

  const updateOrder = (values: FormikValues) => {
    dispatch(
      OrdersModule.actions.updateOrderStore({
        id: orderItemId,
        storeId,
        status: values?.status && values?.status[0],
      })
    );
  };
  return (
    <Box width={'full'}>
      <Formik enableReinitialize initialValues={{ status: orderStatus }} onSubmit={updateOrder}>
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
              {responsive && (
                <Flex width={'200px'} alignItems={'flex-end'} justifyContent={'flex-end'}>
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
              )}
            </Flex>
            <Flex
              width={{ base: 'full', lg: '1/2' }}
              alignItems={'center'}
              justifyContent={'flex-end'}
            >
              {!responsive && (
                <Box width={'full'}>
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
                </Box>
              )}

              <Flex width={'1/2'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                {edit ? (
                  <Flex gap={2}>
                    <BaseButton
                      colorType={'danger'}
                      withGradient
                      leftIcon={responsive ? undefined : <IoCloseCircle />}
                      onClick={() => {
                        resetForm();
                        setEdit(false);
                      }}
                    >
                      {responsive ? 'Annuler' : ''}
                    </BaseButton>
                    <BaseButton
                      disabled={!dirty}
                      colorType={'success'}
                      withGradient
                      leftIcon={responsive ? undefined : <IoCheckbox />}
                      onClick={() => {
                        setEdit(false);
                        handleSubmit();
                      }}
                    >
                      {responsive ? 'Valider' : ''}
                    </BaseButton>
                  </Flex>
                ) : (
                  <CustomToolTip message={'Clicquer pour modifier le status de la livraison'}>
                    <MdEdit size={24} cursor={'pointer'} onClick={() => setEdit(true)} />
                  </CustomToolTip>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Formik>
      {responsive ? (
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
      ) : (
        <OrderClientMobileDisplay orderDetailsList={orderDetailsList} />
      )}
    </Box>
  );
};
