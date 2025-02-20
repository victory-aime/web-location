"use client";

import { Center, Box, Heading, VStack, Flex, Text } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { Checkbox } from "_/components/ui/checkbox";
import { VariablesColors } from "_/theme/variables";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { Form, Formik, FormikValues } from "formik";
import { FormTextInput } from "_/components/custom/form";

const LoginComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector(
    AuthModule.selectors.authSelector
  );

  const submitForm = (values: FormikValues) => {
    dispatch(
      AuthModule.actions.authLoginRequestAction({
        email: values?.email as string,
        password: values?.password as string,
      })
    );
  };

  useEffect(() => {
    if (isLoggedIn) router.push(APP_ROUTES.PRIVATE.DASH);
  }, [isLoggedIn]);

  return (
    <>
      <Center
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={"column"}
        width={"100%"}
        gap={4}
      >
        <Heading>Sign In</Heading>
        <Text textAlign="center">
          Enter your email and password to sign in!
        </Text>

        <Formik
          enableReinitialize
          initialValues={{
            email: "owner@example.com",
            password: "password123",
          }}
          onSubmit={submitForm}
        >
          {({ handleSubmit, values }) => (
            <VStack alignItems={"flex-start"} gap={6} mt={4} width={"100%"}>
              <FormTextInput
                required
                name={"email"}
                type={"email"}
                label={"Email"}
                placeholder={"email"}
                value={values.email}
              />
              <FormTextInput
                required
                name={"password"}
                type={"password"}
                label={"password"}
                placeholder={"password"}
                value={values.password}
              />
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
                  handleSubmit();
                }}
                isLoading={isLoading}
              >
                Sign in
              </BaseButton>
            </VStack>
          )}
        </Formik>
        <Flex>
          <Text>
            Not registered yet?{" "}
            <Link href={APP_ROUTES.PUBLIC.SIGN_UP}>
              <span
                style={{ color: VariablesColors.primary, fontWeight: "bold" }}
              >
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
