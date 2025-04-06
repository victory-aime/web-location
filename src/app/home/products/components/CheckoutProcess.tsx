"use client";
import React, { ReactNode, useState } from "react";
import { Box, Flex, Separator } from "@chakra-ui/react";
import CustomStepper from "_components/custom/stepper/CustomStepper";
import BoxContainer from "_components/custom/container/BoxContainer";
import { BaseText, TextVariant } from "_components/custom/base-text";
import CustomFormatNumber from "_components/custom/format-number/CustomFormatNumber";
import { BaseButton } from "_components/custom/button";
import { useCart } from "_app/hooks/cart";
import axios from "axios";
import PaymentInfo from "../cart/process/components/PaymentInfo";
import RecapOrder from "../cart/process/components/RecapOrder";
import ShippingAddress from "../cart/process/components/ShippingAddress";

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

  const sendOrder = async () => {
    const values = {
      total: calculateTotalPrice(cart),
      userId: "4a8a79ea-301d-4165-9cfd-fb4b5c71577c",
      productId: cart[0].id,
      price: parseFloat(cart[0].price as unknown as string),
      quantity: parseInt(cart[0].quantity as unknown as string, 10),
    };
    const send = await axios.post("http://localhost:4000/order", values);
    console.log("response ====", send.data);
  };

  return (
    <BoxContainer borderWidth={"none"} p={{ base: 5, md: 10 }}>
      <BaseText variant={TextVariant.H2}>{steps[currentStep]?.label}</BaseText>
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
  );
};

export default CheckoutProcess;
