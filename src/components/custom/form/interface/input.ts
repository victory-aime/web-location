import {
  HTMLChakraProps,
  ListCollection,
  CheckboxRootProps,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

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
  type?: HTMLInputTypeAttribute | undefined;
  accept?: string;
  validate?: any;
  customRadius?: number;
  height?: string | number;
  toolTipInfo?: string;
  onChangeFunction?: any;
}

interface FormTextAreaProps extends TextInputProps {
  minHeight?: string;
}

interface FullSelectProps {
  name: string;
  label?: string;
  listItems: ListCollection<unknown>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<any>;
  placeholder?: string;
  isDisabled?: boolean;
  isMultiSelect?: boolean;
  onChangeFunc?: (data: any) => void;
  localErrorMsg?: string;
  validate?: any;
  required?: boolean;
  width?: string;
}
interface DefaultProps extends TextInputProps {
  isNumber?: boolean;
  min: number;
  max: number;
}

interface CheckBoxProps extends HTMLChakraProps<"label"> {
  name: string;
  validate?: any;
  label: string | React.ReactNode;
}

export type {
  TextInputProps,
  FormTextAreaProps,
  FullSelectProps,
  DefaultProps,
  CheckBoxProps,
};
