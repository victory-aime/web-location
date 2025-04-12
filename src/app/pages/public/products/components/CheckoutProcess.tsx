'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Flex, Separator } from '@chakra-ui/react';
import CustomStepper from '_components/custom/stepper/CustomStepper';
import BoxContainer from '_components/custom/container/BoxContainer';
import { BaseText, TextVariant } from '_components/custom/base-text';
import CustomFormatNumber from '_components/custom/format-number/CustomFormatNumber';
import { BaseButton } from '_components/custom/button';
import { useCart } from '_app/hooks/cart';
import PaymentInfo from '../cart/process/components/PaymentInfo';
import RecapOrder from '../cart/process/components/RecapOrder';
import ShippingAddress from '../cart/process/components/ShippingAddress';
import { useDispatch, useSelector } from 'react-redux';
import { UsersModule, OrdersModule } from '_store/src/modules';
import { useRouter } from 'next/navigation';
import { TYPES } from '_store/src';
import { OrdersSuccessModal } from '../cart/process/components/OrderSuccessModal';
import { useSession } from 'next-auth/react';

const CheckoutProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart, calculateTotalPrice, clearCart, triggerRefresh } = useCart();
  const dispatch = useDispatch();
  const { user } = useSelector(UsersModule.selectors.userSelector);
  const { orderActions } = useSelector(OrdersModule.selectors.ordersSelector);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const steps = [
    {
      stepNumber: 0,
      label: 'Address',
      icon: null,
      content: ({ NextTrigger }: { NextTrigger: ReactNode | any }) => (
        <ShippingAddress Next={NextTrigger} session={session} />
      ),
    },
    {
      stepNumber: 1,
      label: 'Paiement',
      icon: null,
      content: ({
        PrevTrigger,
        NextTrigger,
      }: {
        PrevTrigger: ReactNode | any;
        NextTrigger: ReactNode | any;
      }) => <PaymentInfo Next={NextTrigger} Previous={PrevTrigger} />,
    },
    {
      stepNumber: 2,
      label: 'Ma Commande',
      icon: null,
      content: ({ PrevTrigger }: { PrevTrigger: ReactNode | any }) => (
        <RecapOrder cart={cart} Previous={PrevTrigger} sendOrder={sendOrder} />
      ),
    },
  ];

  const handleStepChange = (step: number) => {
    const index = steps.findIndex((item) => item.stepNumber === step);
    if (index !== -1) {
      setCurrentStep(index);
    }
  };

  const sendOrder = async () => {
    const values: TYPES.MODELS.ORDERS.CreateOrderDto = {
      total: calculateTotalPrice(cart),
      userId: user?.id,
      orderItems: cart?.map((item) => ({
        productId: item.id,
        quantity: parseInt(item.quantity as unknown as string, 10),
        price: parseFloat(item.price as unknown as string),
        storeId: item.storeId,
      })),
    };
    dispatch(OrdersModule.actions.createOrder(values));
  };

  useEffect(() => {
    if (orderActions) {
      setOpenModal(true);
      clearCart();
    }
  }, [orderActions, triggerRefresh]);

  return (
    <BoxContainer borderWidth={'none'} p={{ base: 5, md: 10 }}>
      <BaseText variant={TextVariant.H2}>{steps[currentStep]?.label}</BaseText>
      <Flex gap={20} width={'full'} flexDir={{ base: 'column', lg: 'row' }}>
        <Box mt={5} width={'full'}>
          <CustomStepper steps={steps} goNextSteps={handleStepChange} />
        </Box>
        <Box
          width={{ base: 'full', lg: '1/2' }}
          mt={5}
          height={'fit-content'}
          boxShadow={'md'}
          borderRadius={'7px'}
          p={2}
        >
          <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <BaseText>Sous-total</BaseText>
              <BaseText variant={TextVariant.H3}>
                <CustomFormatNumber value={calculateTotalPrice(cart)} />
              </BaseText>
            </Flex>
            <BaseText variant={TextVariant.XS} mt={1}>
              Frais de livraison non inclus à ce stade.
            </BaseText>
          </Box>
          <Separator />
          <Box width={'full'} mt={8}>
            {currentStep === 2 && (
              <BaseButton colorType={'secondary'} withGradient width={'full'} onClick={sendOrder}>
                Commander(
                <CustomFormatNumber value={calculateTotalPrice(cart)} />)
              </BaseButton>
            )}
          </Box>
        </Box>
      </Flex>
      <OrdersSuccessModal
        openModal={openModal}
        onClose={() => {
          setOpenModal(false);
          dispatch(OrdersModule.actions.clearOrderStore());
        }}
        router={router}
      />
    </BoxContainer>
  );
};

export default CheckoutProcess;
