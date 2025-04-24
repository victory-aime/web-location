'use client'

import { Box, Flex, VStack, HStack, useBreakpointValue } from '@chakra-ui/react'
import { BaseText, TextVariant, TextWeight, BoxIcon, FormSelect, CustomBadge, CustomToolTip, BaseButton } from '_components/custom'
import { Formik, FormikValues } from 'formik'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { OrderInfoMobileDisplay } from './OrderInfoMobileDisplay'
import { IoCheckbox, IoCloseCircle } from 'react-icons/io5'
import { TYPES } from 'bvg-innovation-shared'

export const OrderInfo = ({
  orderStatus,
  orderDetailsList,
  onSubmit,
  captureReset,
}: {
  orderDetailsList: any[]
  orderStatus: TYPES.MODELS.PRODUCTS.OrderItemStatus | string[]
  onSubmit: (values: FormikValues) => void
  captureReset: (resetFn: () => void) => void
}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const responsive = useBreakpointValue({ base: false, lg: true })

  return (
    <Box width={'full'}>
      <Formik enableReinitialize initialValues={{ status: orderStatus }} onSubmit={onSubmit}>
        {({ setFieldValue, resetForm, handleSubmit, dirty }) => {
          captureReset(resetForm)
          return (
            <Flex gap={3} width={'full'} alignItems={'center'} justifyContent={'space-between'} flexDir={{ base: 'column', lg: 'row' }}>
              <Flex width={'full'} alignItems={'center'} gap={3} flexDir={{ base: 'column', lg: 'row' }}>
                <BaseText width={'full'} weight={TextWeight.Bold} variant={TextVariant.H3}>
                  Commande {'#452130'}
                </BaseText>

                {responsive && (
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
                )}
              </Flex>
              <Flex width={{ base: 'full', lg: '1/3' }} alignItems={'center'} justifyContent={'flex-end'}>
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
                          resetForm()
                          setEdit(false)
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
                          setEdit(false)
                          handleSubmit()
                        }}
                      >
                        {responsive ? 'Valider' : ''}
                      </BaseButton>
                    </Flex>
                  ) : (
                    <CustomToolTip message={'Cliquer pour modifier le status de la livraison'}>
                      <MdEdit size={24} cursor={'pointer'} onClick={() => setEdit(true)} />
                    </CustomToolTip>
                  )}
                </Flex>
              </Flex>
            </Flex>
          )
        }}
      </Formik>
      {responsive ? (
        <VStack gap={3} mt={5}>
          {orderDetailsList.map((item, index) => (
            <HStack key={index} width={'full'} alignItems={'center'} justifyContent={'space-between'}>
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
        <OrderInfoMobileDisplay orderDetailsList={orderDetailsList} />
      )}
    </Box>
  )
}
