import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_components/custom/base-text";
import { CustomRadioCard } from "_components/custom/radio-card/CustomRadioCard";
import React, { useState } from "react";
import { BaseButton } from "_components/custom/button";

const ShippingAddress = ({ Next }: { Next: any }) => {
  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const items = [
    {
      label: "Address Name",
      content: (
        <VStack mt={2} gap={3}>
          <BaseText lineHeight={"1.4"} variant={TextVariant.S}>
            Créez un compte utilisateur pour parcourir notre catalogue, ajouter
            des produits à votre
          </BaseText>
          <Flex gap={4}>
            <BaseButton bg={"gray"}>Edit</BaseButton>
            <BaseButton bg={"red"}>Delete</BaseButton>
          </Flex>
        </VStack>
      ),
    },
    {
      label: "Address Name2",
      content: (
        <VStack mt={2} gap={3}>
          <BaseText lineHeight={"1.4"} variant={TextVariant.S}>
            Créez un compte utilisateur pour parcourir notre catalogue, ajouter
            des produits à votre
          </BaseText>
          <Flex gap={4}>
            <BaseButton bg={"gray"}>Edit</BaseButton>
            <BaseButton bg={"red"}>Delete</BaseButton>
          </Flex>
        </VStack>
      ),
    },
  ];

  return (
    <Box>
      <VStack gap={2} alignItems={"flex-start"}>
        <BaseText weight={TextWeight.Bold}>
          Selectionnez votre adresse de livraison
        </BaseText>
        <BaseText>Choose address description</BaseText>
      </VStack>

      <Box width={"full"} mt={5}>
        <CustomRadioCard
          items={items}
          stepButton={
            <Next>
              <BaseButton bg={"teal"} width={"full"}>
                Faire Livrer Ici
              </BaseButton>
            </Next>
          }
          onValueChange={(selected: { value: string }) =>
            setCurrentIndex(selected.value)
          }
        />
      </Box>
    </Box>
  );
};

export default ShippingAddress;
