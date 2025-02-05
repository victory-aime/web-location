import { ButtonProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export type variantColorType =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "none";

export type animationType =
  | "none"
  | "pulse"
  | "rotate"
  | "scale"
  | "shake"
  | "grow"
  | "fade";

export interface VariantColorStyle {
  bg: string;
  gradient: string;
  hover: string;
  textColor: string;
}

export interface ButtonBaseProps extends ButtonProps {
  children?: React.ReactNode;
  withGradient?: boolean;
  colorType?: variantColorType;
  status?: string;
  animation?: animationType;
  isLoading?: boolean;
  rightIcon?: ReactNode;
}
