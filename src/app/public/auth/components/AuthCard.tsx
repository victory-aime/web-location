import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AuthCard = ({
  children,
  animationType,
}: {
  children: ReactNode;
  animationType: "login" | "register";
}) => {
  return (
    <Flex
      animation={animationType === "login" ? "slideRight" : "slideLeft"}
      position={"relative"}
      width={"full"}
      p={{ base: 3, md: 6 }}
      gap={4}
    >
      <Box width={"full"}>{children}</Box>
    </Flex>
  );
};

export default AuthCard;
