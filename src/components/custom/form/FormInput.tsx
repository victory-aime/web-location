import React, { useState } from "react";
import { useField } from "formik";
import { Input, Text, Field, Flex } from "@chakra-ui/react";
import { TextInputProps } from "./interface/input";
import { InputGroup } from "_/components/ui/input-group";
import { VariablesColors } from "_/theme/variables";
import { Eye, EyeOff } from "_assets/svg";
import { TbLockBitcoin } from "react-icons/tb";
import { InfoTip } from "_/components/ui/toggle-tip";

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
  toolTipInfo,
  onBlur,
  ...rest
}: TextInputProps) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = isReadOnly ? !!error : !!(touched && error);
  const isPassword = type === "password";
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

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

      <InputGroup
        flex={1}
        width={"full"}
        startElement={
          isPassword ? (
            <Flex
              mt={"5px"}
              pl={"10px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <TbLockBitcoin />
            </Flex>
          ) : (
            leftAccessory && (
              <Flex
                mt={"5px"}
                pl={"10px"}
                boxSize={"30px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {leftAccessory}
              </Flex>
            )
          )
        }
        endElement={
          isPassword ? (
            <Flex
              mt={"5px"}
              pr={"10px"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => setSecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? (
                <EyeOff
                  width={18}
                  height={18}
                  fill={VariablesColors.grayScale}
                />
              ) : (
                <Eye width={18} height={18} fill={VariablesColors.grayScale} />
              )}
            </Flex>
          ) : toolTipInfo ? (
            <InfoTip lazyMount size={"sm"} content={toolTipInfo} />
          ) : (
            rightAccessory
          )
        }
      >
        <Input
          {...rest}
          {...field}
          type={isPassword ? (secureTextEntry ? "password" : "text") : type}
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
          fontSize={"16px"}
          height={height ?? "50px"}
          autoCapitalize="none"
          accept={accept}
        />
      </InputGroup>

      {isError && <Field.ErrorText>{error}</Field.ErrorText>}
      {localErrorMsg && (
        <Field.HelperText p={1}>{localErrorMsg}</Field.HelperText>
      )}
    </Field.Root>
  );
};

export default FormTextInput;
