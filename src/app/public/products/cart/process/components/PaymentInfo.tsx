import { Center, Flex } from "@chakra-ui/react";
import { BaseText } from "_components/custom/base-text";
import { BaseButton } from "_components/custom/button";
import React from "react";
import { useColorModeValue } from "_components/ui/color-mode";

const PaymentInfo = ({ Next, Previous }: { Next: any; Previous: any }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Center flexDir={"column"}>
      <BaseText mt={2} color={textColor}>
        Actuellement, le paiement s'effectue à la livraison. Les frais de
        livraison peuvent varier en fonction de votre adresse. Vous serez
        informé du montant exact lors de la confirmation de votre commande avec
        le marchand.
      </BaseText>
      <Flex mt={5}>
        <Previous>
          <BaseButton bg={"gray"}>Revenir</BaseButton>
        </Previous>
        <Next>
          <BaseButton colorType={"secondary"} ml={2}>
            Continuez
          </BaseButton>
        </Next>
      </Flex>
    </Center>
  );
};

export default PaymentInfo;
