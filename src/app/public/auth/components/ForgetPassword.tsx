import { Text, VStack } from "@chakra-ui/react";
import { FormTextInput } from "_components/custom/form";
import { ModalComponent } from "_components/custom/modal";
import { Formik } from "formik";

import React from "react";

const ForgetPassword = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (value: any) => void;
}) => {
  const submitForm = (values: any) => {
    console.log("values", values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "owner@example.com",
      }}
      onSubmit={submitForm}
    >
      {({ handleSubmit, values }) => (
        <ModalComponent
          title={"Reset password"}
          isOpen={open}
          onChange={onChange}
          buttonSaveTitle="Validate"
          ignoreFooter={false}
          onClick={handleSubmit}
        >
          <VStack alignItems={"flex-start"} gap={6} mt={4} width={"100%"}>
            <Text>
              Veuillez saisir votre email un code sera envoye vous permettant de
              reinitialiser votre mot de passe
            </Text>
            <FormTextInput
              required
              name={"email"}
              type={"email"}
              label={"Email"}
              placeholder={"Veuillez saisir votre addresse email"}
              value={values.email}
            />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  );
};

export default ForgetPassword;
