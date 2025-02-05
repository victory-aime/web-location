import React from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  Input,
  Flex,
  Text,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { Checkbox } from "_/components/ui/checkbox";
import { Field } from "_/components/ui/field";
import { Colors } from "_/theme/variables";
import Link from "next/link";

const RegisterComponent = () => {
  return (
    <Center
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={"column"}
      width={"100%"}
      gap={6}
    >
      <Heading>Sign Up</Heading>
      <Text>Enter your email and password to sign in!</Text>
      <VStack alignItems={"flex-start"} gap={6} width={"100%"}>
        <Field required label={"email"}>
          <Input />
        </Field>
        <Field required label={"phone"}>
          <Input />
        </Field>
        <Field required label={"password"}>
          <Input />
        </Field>
        <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
          <Checkbox size={"lg"}>Terms & conitions</Checkbox>
        </Flex>
        <BaseButton
          withGradient
          animation="fade"
          colorType="success"
          padding={"25px"}
          w={"100%"}
        >
          Sign up
        </BaseButton>
      </VStack>
      <Flex>
        <Text>
          Already registered yet?{" "}
          <Link href={APP_ROUTES.PUBLIC.SIGN_IN}>
            <span style={{ color: Colors.primary, fontWeight: "bold" }}>
              Log in
            </span>
          </Link>
        </Text>
      </Flex>
    </Center>
  );
};

export default RegisterComponent;
