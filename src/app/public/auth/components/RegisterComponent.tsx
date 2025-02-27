import React from "react";
import { Center, Box, Heading, VStack, Flex, Text } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { Checkbox } from "_/components/ui/checkbox";
import { VariablesColors } from "_/theme/variables";
import Link from "next/link";
import { FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";

const RegisterComponent = () => {
  return (
    <Center
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={"column"}
      width={"100%"}
      gap={6}
    >
      <Heading>Creer un nouveau compte</Heading>
      <Text color={"gray.500"}>
        Veuillez remplir vos informations ci dessous
      </Text>

      <Formik
        enableReinitialize
        initialValues={{
          email: "owner@example.com",
          password: "password123",
          phone: "12544785",
        }}
        onSubmit={() => {}}
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
              name={"phone"}
              type={"tel"}
              label={"Telephone"}
              placeholder={"Veuillez saisir votre numero de telephone"}
              value={values.phone}
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
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Checkbox size={"lg"}>Terms & conditions</Checkbox>
            </Flex>
            <BaseButton
              withGradient
              colorType="success"
              padding={"25px"}
              w={"100%"}
              onClick={() => {
                handleSubmit();
              }}
              isLoading={false}
            >
              Creer mon compte
            </BaseButton>
          </VStack>
        )}
      </Formik>

      <Flex>
        <Text>
          Vous avez deja un compte?{" "}
          <Link href={APP_ROUTES.PUBLIC.SIGN_IN}>
            <span
              style={{ color: VariablesColors.primary, fontWeight: "bold" }}
            >
              Connectez-vous
            </span>
          </Link>
        </Text>
      </Flex>
    </Center>
  );
};

export default RegisterComponent;
