"use client";

import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import LoginComponent from "../components/LoginComponent";
import AuthBox from "../components/AuthBox";

const LoginPage = () => {
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  return (
    <AuthBox isResponsive={responsiveMode ?? false}>
      {responsiveMode ? (
        <Box width={"full"} position={"relative"}>
          <Image
            src={"/assets/images/auth/login-background.png"}
            alt={"login-background"}
          />
          <Box position={"absolute"} top={0} left={0} m={"30px"}>
            <Text fontSize={"45px"}>E-shop</Text>
          </Box>
        </Box>
      ) : (
        <Box p={"20px"}>
          <Text fontSize={"25px"}>E-shop</Text>
        </Box>
      )}
      <Box width={"full"} p={{ base: 6, md: 6 }}>
        <LoginComponent />
      </Box>
    </AuthBox>
  );
};

export default LoginPage;
