import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AuthCard = ({
  children,
  animationType,
}: {
  children: ReactNode;
  animationType: "login" | "register";
}) => {
  return (
    <Box
      animation={animationType === "login" ? "slideRight" : "slideLeft"}
      boxShadow={"0 5px 15px rgba(59, 246, 134, 0.35)"}
      position={"relative"}
      borderRadius={"12px"}
      borderWidth={2}
      borderColor={"whiteAlpha.400"}
      maxW={"100%"}
      width={{ base: "100%", md: "500px", lg: "650px" }}
      p={{ base: 3, md: 6 }}
    >
      {children}
    </Box>
  );
};

export default AuthCard;
