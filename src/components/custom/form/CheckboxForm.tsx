import { Field } from "@chakra-ui/react";
import { Checkbox } from "_/components/ui/checkbox";
import { useField } from "formik";
import React, { FC, useState } from "react";
import { CheckBoxProps } from "./interface/input";

const CheckboxForm: FC<CheckBoxProps> = ({ name, validate, label }) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }, helpers] = useField(fieldHookConfig);
  const { setValue } = helpers;
  const [isChecked, setIschecked] = useState<boolean>(false);
  const isError = !!error || !!(touched && error);

  return (
    <Field.Root id={name} invalid={isError}>
      <Checkbox
        {...field}
        name={name}
        checked={field.value}
        size={"lg"}
        colorPalette={isChecked ? "green" : isError ? "red" : "none"}
        onCheckedChange={({ checked }) => {
          setValue(checked);
          setIschecked(true);
        }}
        mb={4}
      >
        {label}
      </Checkbox>
      {isError && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default CheckboxForm;
