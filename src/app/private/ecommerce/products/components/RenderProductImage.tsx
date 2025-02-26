import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const RenderProductImage = ({ value }: any) => {
  return (
    <Flex width={"full"} alignItems={"center"} gap={4}>
      <Flex
        width={"40px"}
        height={"40px"}
        bgColor={"whiteAlpha.400"}
        borderRadius={"7px"}
      >
        <Image
          src={
            (value?.images && value?.images[0]) ??
            "https://avatar.iran.liara.run/public"
          }
          alt={"image"}
          width={40}
          height={40}
          unoptimized={true}
          style={{ borderRadius: "7px" }}
        />
      </Flex>
      <Flex flexDir={"column"} gap={"3px"}>
        <Text truncate>{value?.name ?? value}</Text>
        {value?.variants ? (
          <Text truncate color={"gray.700"}>
            {value?.variants?.length} variant (s)
          </Text>
        ) : (
          <Text truncate color={"gray.700"}>
            {value?.numberOfproducts} produit (s)
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
