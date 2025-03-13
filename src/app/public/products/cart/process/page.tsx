"use client";
import React, { ReactNode, useState } from "react";
import { Box, Flex, Separator } from "@chakra-ui/react";
import CustomStepper from "_components/custom/stepper/CustomStepper";
import Header from "_app/public/components/Header";
import BoxContainer from "_components/custom/container/BoxContainer";
import { BaseText, TextVariant } from "_components/custom/base-text";
import ShippingAddress from "_app/public/products/cart/process/components/ShippingAddress";
import CustomFormatNumber from "_components/custom/format-number/CustomFormatNumber";
import { BaseButton } from "_components/custom/button";
import PaymentInfo from "_app/public/products/cart/process/components/PaymentInfo";
import { useCart } from "_app/hooks/cart";
import RecapOrder from "_app/public/products/cart/process/components/RecapOrder";

const CheckoutProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart, calculateTotalPrice } = useCart();
  const steps = [
    {
      stepNumber: 0,
      label: "Address",
      icon: null,
      content: ({ NextTrigger }: { NextTrigger: ReactNode | any }) => (
        <ShippingAddress Next={NextTrigger} />
      ),
    },
    {
      stepNumber: 1,
      label: "Paiement",
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
      label: "Ma Commande",
      icon: null,
      content: ({
        PrevTrigger,
        NextTrigger,
      }: {
        PrevTrigger: ReactNode | any;
        NextTrigger: ReactNode | any;
      }) => (
        <RecapOrder cart={cart} Next={NextTrigger} Previous={PrevTrigger} />
      ),
    },
  ];

  const handleStepChange = (step: number) => {
    const index = steps.findIndex((item) => item.stepNumber === step);
    if (index !== -1) {
      setCurrentStep(index);
    }
  };

  return (
    <Header>
      <BoxContainer borderWidth={"none"} p={{ base: 5, md: 10 }}>
        <BaseText variant={TextVariant.H2}>
          {steps[currentStep]?.label}
        </BaseText>
        <Flex gap={20} width={"full"} flexDir={{ base: "column", lg: "row" }}>
          <Box mt={5} width={"full"}>
            <CustomStepper steps={steps} goNextSteps={handleStepChange} />
          </Box>
          <Box
            width={{ base: "full", lg: "1/2" }}
            mt={5}
            height={"fit-content"}
            boxShadow={"md"}
            borderRadius={"7px"}
            p={2}
          >
            <Box>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
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
            <Box width={"full"} mt={8}>
              {currentStep === 2 && (
                <BaseButton
                  colorType={"secondary"}
                  withGradient
                  width={"full"}
                  onClick={() => {}}
                >
                  Commander(
                  <CustomFormatNumber value={calculateTotalPrice(cart)} />)
                </BaseButton>
              )}
            </Box>
          </Box>
        </Flex>
      </BoxContainer>
    </Header>
  );
};

export default CheckoutProcess;
