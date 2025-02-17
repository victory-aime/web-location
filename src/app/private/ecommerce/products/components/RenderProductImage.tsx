import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const RenderProductImage = ({ value, isImage }: any) => {
  return (
    <Flex width={"full"} alignItems={"center"} gap={4}>
      <Flex
        width={"40px"}
        height={"40px"}
        bgColor={"whiteAlpha.400"}
        borderRadius={"7px"}
      >
        <Image
          src={"/assets/images/mouse.png"}
          alt="image"
          width={40}
          height={40}
        />
      </Flex>
      <Flex flexDir={"column"} gap={"3px"}>
        <Text truncate>{value?.name}</Text>
        <Text truncate color={"whiteAlpha.400"}>
          {value?.variants} variant (s)
        </Text>
      </Flex>
    </Flex>
  );
};
