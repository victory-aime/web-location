import { Field, Flex, Text } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "_components/ui/select";
import React, { FC } from "react";
import { FullSelectProps } from "./interface/input";
import { useField } from "formik";

const FormSelect: FC<FullSelectProps> = ({
  listItems,
  label,
  name,
  required,
  isMultiSelect = false,
  placeholder = "Select an option",
  localErrorMsg,
  width = "full",
  validate,
  isDisabled = false,
  onChangeFunc,
  setFieldValue,
}) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }] = useField(fieldHookConfig);
  const isError = !!(touched && error);

  return (
    <Field.Root
      id={name}
      invalid={isError}
      disabled={isDisabled}
      width={"full"}
    >
      <SelectRoot
        name={field.name}
        value={field.value}
        variant={"subtle"}
        required={required}
        lazyMount
        unmountOnExit
        onValueChange={(item: any) => {
          setFieldValue(name, item?.value);
          onChangeFunc?.(item?.value);
        }}
        multiple={isMultiSelect}
        onBlur={(e) => {
          field?.onBlur(e);
        }}
        collection={listItems}
        size={"lg"}
        width={width}
      >
        {label && (
          <SelectLabel
            display={"flex"}
            gap={"6px"}
            fontSize={{ base: "14px", md: "16px" }}
          >
            {label}
            {required && <Text color={"red"}> * </Text>}
          </SelectLabel>
        )}
        <SelectTrigger clearable>
          <SelectValueText pl={3} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent borderRadius={7} p={3}>
          {listItems?.items?.map((item: any) => (
            <SelectItem
              _highlighted={{ color: "primary.500" }}
              py={1}
              item={item.value}
              key={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {isError && (
        <Flex gap={1} mt={1} alignItems={"center"}>
          <Field.ErrorIcon width={4} height={4} color={"red.500"} />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Flex>
      )}
      {localErrorMsg && (
        <Field.HelperText p={1}>{localErrorMsg}</Field.HelperText>
      )}
    </Field.Root>
  );
};

export default FormSelect;
