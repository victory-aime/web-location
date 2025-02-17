import React from "react";
import RegisterComponent from "../components/RegisterComponent";
import { Box, Text } from "@chakra-ui/react";
import AuthBox from "../components/AuthBox";
import AuthCard from "../components/AuthCard";

const Register = () => {
  return (
    <AuthBox>
      <AuthCard animationType="register">
        <RegisterComponent />
      </AuthCard>
      <Box mt={50} textAlign="center">
        <Text fontSize={{ base: "sm", md: "md" }}>
          ©2025 VICTORY UI. All Rights Reserved.
        </Text>
      </Box>
    </AuthBox>
  );
};

export default Register;
