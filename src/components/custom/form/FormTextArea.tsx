import React, { FC } from "react";
import { useField } from "formik";
import { Field, Text, Textarea } from "@chakra-ui/react";
import { FormTextAreaProps } from "./interface/input";

const FormTextArea: FC<FormTextAreaProps> = ({
  required = false,
  label,
  value,
  onChangeFunction,
  name,
  placeholder,
  width,
  localErrorMsg,
  isReadOnly,
  isDisabled,
  validate,
}) => {
  const fieldHookConfig = {
    name,
    validate,
  };

  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = isReadOnly ? !!error : !!(touched && error);

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label display={"flex"} gap={"6px"}>
          {label}
          {required && <Text color={"red"}> * </Text>}
        </Field.Label>
      )}
      <Textarea
        {...field}
        bg={"bg.muted"}
        autoresize
        border={"1px solid"}
        borderColor={isError ? "red.500" : "bg.muted"}
        _focus={{ borderColor: "primary.500" }}
        _placeholder={{ color: isError ? "red.500" : "whiteAlpha.400" }}
        placeholder={placeholder ?? ""}
        width={width}
        p={3}
        mt={"5px"}
        borderRadius={"7px"}
        value={value ?? field.value}
        onChange={(event: never) => {
          onChangeFunction(event);
        }}
        readOnly={isReadOnly}
        disabled={isDisabled}
        onBlur={(e) => {
          field.onBlur(e);
        }}
      />
      {isError && <Field.ErrorText>{error}</Field.ErrorText>}
      {localErrorMsg && (
        <Field.HelperText p={1}>{localErrorMsg}</Field.HelperText>
      )}
    </Field.Root>
  );
};

export default FormTextArea;
