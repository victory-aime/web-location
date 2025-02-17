import { Input, Stack, Text } from "@chakra-ui/react";
import { ModalComponent } from "_/components/custom/modal";
import { Field } from "_/components/ui/field";

import React from "react";

const ForgetPassword = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (value: any) => void;
}) => {
  return (
    <ModalComponent
      title={"Reset password"}
      isOpen={open}
      onChange={onChange}
      buttonSaveTitle="Validate"
    >
      <Stack gap="8">
        <Text>
          Veuillez saisir votre email un code sera envoye vous permettant de
          reinni
        </Text>
        <Field>
          <Input placeholder="Email" />
        </Field>
      </Stack>
    </ModalComponent>
  );
};

export default ForgetPassword;
