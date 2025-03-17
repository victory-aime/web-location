import { Box, HStack, VStack, Separator } from "@chakra-ui/react";
import { BaseText, TextVariant } from "_/components/custom/base-text";
import { BaseButton } from "_/components/custom/button";
import BoxContainer from "_/components/custom/container/BoxContainer";
import React from "react";

const ManageAddress = () => {
  return (
    <BoxContainer
      border={"none"}
      p={{ base: 5, md: 10 }}
      title={"Gerer mes addresse"}
      description={"Gerer mes addresse description"}
      buttonTitle={"Nouvelle addresse"}
    >
      <Box gap={5} mt={5} width={"full"}>
        {Array.from({ length: 3 })?.map((_, index) => (
          <Box key={index} width={"full"}>
            <HStack width={"full"} flexDir={{ base: "column", md: "row" }}>
              <VStack gap={3} width={"full"} alignItems={"flex-start"}>
                <BaseText variant={TextVariant.H3}>Quartier</BaseText>
                <BaseText variant={TextVariant.S}>address value</BaseText>
                <BaseText variant={TextVariant.M}>addressPhone number</BaseText>
              </VStack>
              <VStack
                width={"full"}
                alignItems={{ base: "center", md: "flex-end" }}
                justifyContent={{ base: "center", md: "flex-end" }}
                flexDir={{ base: "row", md: "column" }}
              >
                <BaseButton bg={"gray"}>edit</BaseButton>
                <BaseButton colorType={"danger"}>Delete</BaseButton>
              </VStack>
            </HStack>
            <Separator mt={3} mb={3} />
          </Box>
        ))}
      </Box>
    </BoxContainer>
  );
};

export default ManageAddress;
