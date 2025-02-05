"use client";

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
import React, { useEffect, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import ForgetPassword from "./ForgetPassword";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(true);
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      <Center
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={"column"}
        width={"100%"}
        gap={6}
      >
        <Heading>Sign In</Heading>
        <Text textAlign="center">
          Enter your email and password to sign in!
        </Text>
        <Box width={"full"}>
          <BaseButton
            borderWidth={2}
            p={"28px"}
            borderColor={"primary.500"}
            width={"full"}
            gap={8}
            bg={"none"}
          >
            <GrGoogle />
            <Text>Sign in with google</Text>
          </BaseButton>
        </Box>
        <HStack width={"full"}>
          <Separator size={"lg"} flex="1" />
          <Text flexShrink="0">OR</Text>
          <Separator size={"lg"} flex="1" />
        </HStack>
        <VStack alignItems={"flex-start"} gap={6} width={"100%"}>
          <Field required label={"email"}>
            <Input />
          </Field>
          <Field required label={"password"}>
            <Input />
          </Field>
          <Flex
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Checkbox size={"lg"}>Remember me</Checkbox>

            <Text
              onClick={() => setOpen(true)}
              cursor={"pointer"}
              fontWeight={"bold"}
              color={"primary.500"}
            >
              Forget password ?
            </Text>
          </Flex>
          <BaseButton
            withGradient
            animation="fade"
            colorType="success"
            padding={"25px"}
            w={"100%"}
            onClick={() => {
              setLoading(true);
              router?.push(APP_ROUTES.PRIVATE.DASH);
            }}
            isLoading={loading}
          >
            Sign in
          </BaseButton>
        </VStack>
        <Flex>
          <Text>
            Not registered yet?{" "}
            <Link href={APP_ROUTES.PUBLIC.SIGN_UP}>
              <span style={{ color: Colors.primary, fontWeight: "bold" }}>
                Create an account
              </span>
            </Link>
          </Text>
        </Flex>
      </Center>
      <ForgetPassword open={open} onChange={() => setOpen(false)} />
    </>
  );
};

export default LoginComponent;
