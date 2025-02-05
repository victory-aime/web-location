import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AuthBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      position={"relative"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      h={"100vh"}
      px={4}
      bg="linear-gradient(180deg, #0F0F0F 0%, #060021 100%)"
    >
      {children}
    </Box>
  );
};

export default AuthBox;
