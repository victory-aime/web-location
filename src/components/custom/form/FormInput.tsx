import React from "react";
import { useField } from "formik";
import { Input, Text, Field } from "@chakra-ui/react";
import { TextInputProps } from "./interface/input";

const FormTextInput = ({
  name,
  label,
  type = "text",
  placeholder,
  localErrorMsg = "",
  required = false,
  isReadOnly = false,
  isDisabled = false,
  rightAccessory,
  leftAccessory,
  customRadius,
  accept,
  height,
  validate,
  value,
  onChangeFunction,
  useFullAmountMask,
  onBlur,
  ...rest
}: TextInputProps) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = isReadOnly ? !!error : !!(touched && error);

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label
          display={"flex"}
          gap={"6px"}
          fontSize={{ base: "14px", md: "16px" }}
        >
          {label}
          {required && <Text color={"red"}> * </Text>}
        </Field.Label>
      )}

      <Input
        {...rest}
        {...field}
        type={"text"}
        onBlur={(e) => {
          field?.onBlur(e);
          onBlur?.(e);
        }}
        value={value ?? field?.value}
        placeholder={placeholder ?? ""}
        borderRadius={customRadius ?? "7px"}
        border={"1px solid"}
        borderColor={isError ? "red.500" : "bg.muted"}
        _focus={{ borderColor: "primary.500" }}
        _placeholder={{ color: isError ? "red.500" : "whiteAlpha.400" }}
        size={"lg"}
        pl={3}
        mt={"5px"}
        variant={"outline"}
        bg={"bg.muted"}
        readOnly={isReadOnly}
        disabled={isDisabled}
        fontSize={{ base: "14px", md: "16px" }}
        height={height ?? "50px"}
        autoCapitalize="none"
        accept={accept}
      />

      {isError && <Field.ErrorText>{error}</Field.ErrorText>}
      {localErrorMsg && (
        <Field.HelperText p={1}>{localErrorMsg}</Field.HelperText>
      )}
    </Field.Root>
  );
};

export default FormTextInput;
