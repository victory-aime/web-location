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
import { Formik, FormikValues } from "formik";
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
    <Box mt={"30px"}>
      <Center
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={"column"}
        gap={4}
      >
        <Heading>Bon retour parmi Nous!</Heading>
        <Text textAlign="center" color={"gray.500"}>
          Veuillez saisir vos identifiants de connexion
        </Text>

        <Formik
          enableReinitialize
          initialValues={{
            email: "victory@example.com",
            password: "SecurePass123!",
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
                placeholder={"Veuillez saisir votre addresse email"}
                value={values.email}
              />
              <FormTextInput
                required
                name={"password"}
                type={"password"}
                label={"Mot de passe"}
                placeholder={"Veuillez saisir votre mot de passe"}
                value={values.password}
              />
              <Flex
                width={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Checkbox size={"lg"}>Se souvenir de moi</Checkbox>
                <Text
                  onClick={() => setOpen(true)}
                  cursor={"pointer"}
                  fontWeight={"bold"}
                  color={"primary.500"}
                >
                  Mot de passe oublié ?
                </Text>
              </Flex>
              <BaseButton
                withGradient
                colorType="success"
                padding={"25px"}
                w={"100%"}
                onClick={() => {
                  handleSubmit();
                }}
                isLoading={isLoading}
              >
                Se connecter
              </BaseButton>
            </VStack>
          )}
        </Formik>
        <Flex>
          <Text>
            Vous n'avez pas de compte?{" "}
            <Link href={APP_ROUTES.PUBLIC.SIGN_UP}>
              <span
                style={{
                  color: VariablesColors.primary,
                  fontWeight: "bold",
                }}
              >
                Creer votre compte
              </span>
            </Link>
          </Text>
        </Flex>
      </Center>
      <ForgetPassword open={open} onChange={() => setOpen(false)} />
    </Box>
  );
};

export default LoginComponent;
