"use client";

import { Center, Box, VStack, Flex } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { Checkbox } from "_/components/ui/checkbox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { Formik, FormikValues } from "formik";
import { FormTextInput } from "_/components/custom/form";
import { getRedirectRoute } from "_hooks/dynamic-redirect";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_/components/custom/base-text";

const LoginComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, currentUser } = useSelector(
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
    if (isLoggedIn && currentUser?.role) {
      const roles = Array.isArray(currentUser.role)
        ? currentUser.role
        : [currentUser.role];
      router.push(getRedirectRoute(roles));
    }
  }, [isLoggedIn]);

  return (
    <Box mt={"30px"}>
      <Center
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={"column"}
        gap={4}
      >
        <BaseText variant={TextVariant.L}>Bon retour parmi Nous!</BaseText>
        <BaseText color={"gray.500"}>
          Veuillez saisir vos identifiants de connexion
        </BaseText>

        <Formik
          enableReinitialize
          initialValues={{
            email: "users@example.com",
            password: "1passworD45!@",
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
                <BaseText
                  onClick={() => setOpen(true)}
                  cursor={"pointer"}
                  weight={TextWeight.Medium}
                  color={"blue.500"}
                  variant={TextVariant.S}
                >
                  Mot de passe oublié ?
                </BaseText>
              </Flex>
              <BaseButton
                withGradient
                colorType="primary"
                padding={"25px"}
                w={"100%"}
                onClick={() => {
                  handleSubmit();
                }}
                isLoading={isLoading}
              >
                <BaseText>Se connecter</BaseText>
              </BaseButton>
            </VStack>
          )}
        </Formik>
        <Flex
          width={"full"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <BaseText variant={TextVariant.S}>Vous avez deja un compte?</BaseText>
          <Link href={APP_ROUTES.PUBLIC.SIGN_IN}>
            <BaseText
              variant={TextVariant.S}
              color={"blue.500"}
              weight={TextWeight.Medium}
            >
              Connectez-vous
            </BaseText>
          </Link>
        </Flex>
      </Center>
      <ForgetPassword open={open} onChange={() => setOpen(false)} />
    </Box>
  );
};

export default LoginComponent;
