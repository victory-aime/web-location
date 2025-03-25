import React from "react";
import { Center, VStack, Flex } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { VariablesColors } from "_/theme/variables";
import Link from "next/link";
import { CheckBoxFom, FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_/components/custom/base-text";
import { useRouter } from "next/navigation";
import { TYPES } from "_/store/src";
import { useDispatch } from "react-redux";
import axios from "axios";

const RegisterComponent = ({ selectedRole }: { selectedRole: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const submitValues = async (values: any) => {
    const request = {
      type: selectedRole,
      ...values,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/_api/v1/unsecured/user/register",
        {
          ...request,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={"column"}
      width={"100%"}
      gap={6}
    >
      <BaseText variant={TextVariant.H3}>Creer un nouveau compte</BaseText>
      <BaseText color={"gray.500"}>
        Veuillez remplir vos informations ci dessous
      </BaseText>

      <Formik
        enableReinitialize
        initialValues={{
          name: "client",
          firstName: "victory",
          email: "users@example.com",
          password: "1passworD45!@",
          phone: "12544785",
          shippingAddress: "Residence Bosh 4000, Sousse",
          terms: false,
        }}
        onSubmit={submitValues}
        validationSchema={
          TYPES.VALIDATION_SCHEMA.AUTH_SCHEMA.registerUserValidation
        }
      >
        {({ handleSubmit, values }) => (
          <VStack alignItems={"flex-start"} gap={6} mt={4} width={"100%"}>
            <FormTextInput
              required
              name={"name"}
              label={"Nom"}
              placeholder={"Veuillez saisir votre nom"}
              value={values.name}
            />
            <FormTextInput
              required
              name={"firstName"}
              label={"Prenom"}
              placeholder={"Veuillez saisir votre prenom"}
              value={values.firstName}
            />
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
              name={"shippingAddress"}
              label={"Addresse de livraison"}
              placeholder={"Veuillez saisir votre addresse de livraison"}
              value={values.shippingAddress}
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
              gap={2}
            >
              <CheckBoxFom
                name="terms"
                label={
                  <BaseText
                    textDecoration={"underline"}
                    onClick={() =>
                      router.push(APP_ROUTES.PUBLIC.TERMS_CONDITIONS)
                    }
                  >
                    Terms & conditions
                  </BaseText>
                }
              />
            </Flex>
            <BaseButton
              withGradient
              colorType="primary"
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
            color={VariablesColors.blue}
            weight={TextWeight.Bold}
          >
            Connectez-vous
          </BaseText>
        </Link>
      </Flex>
    </Center>
  );
};

export default RegisterComponent;
