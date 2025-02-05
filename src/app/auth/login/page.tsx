import { Box, Text } from "@chakra-ui/react";
import AuthCard from "../components/AuthCard";
import LoginComponent from "../components/LoginComponent";
import AuthBox from "../components/AuthBox";

const LoginPage = () => {
  return (
    <AuthBox>
      <AuthCard animationType="login">
        <LoginComponent />
      </AuthCard>
      <Box mt={50} textAlign="center">
        <Text fontSize={{ base: "sm", md: "md" }}>
          ©2025 VICTORY UI. All Rights Reserved.
        </Text>
      </Box>
    </AuthBox>
  );
};

export default LoginPage;
