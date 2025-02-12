import { HTMLChakraProps } from "@chakra-ui/react";

interface TextInputProps extends HTMLChakraProps<"input"> {
  name: string;
  label?: string;
  required?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  localErrorMsg?: string;
  useFullAmountMask?: boolean;
  rightAccessory?: React.ReactNode;
  leftAccessory?: React.ReactNode;
  type?: string;
  accept?: string;
  validate?: any;
  customRadius?: number;
  height?: string | number;
  onChangeFunction?: any;
}

interface FormTextAreaProps extends TextInputProps {
  minHeight?: string;
}

export type { TextInputProps, FormTextAreaProps };
