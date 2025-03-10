import { Text, TextProps } from "@chakra-ui/react";
import React from "react";
import { TextVariant, TextWeight } from "./interface/base-text";

interface BaseTextProps extends TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
}

export const BaseText: React.FC<BaseTextProps> = ({
  variant = TextVariant.M,
  weight = TextWeight.Regular,
  children,
  ...props
}) => {
  const sizeMap: Record<TextVariant, string> = {
    [TextVariant.H1]: "32px",
    [TextVariant.H2]: "28px",
    [TextVariant.H3]: "24px",
    [TextVariant.L]: "20px",
    [TextVariant.XL]: "18px",
    [TextVariant.M]: "16px",
    [TextVariant.S]: "14px",
    [TextVariant.XS]: "12px",
  };

  const weightMap: Record<TextWeight, string> = {
    [TextWeight.Regular]: "400",
    [TextWeight.Medium]: "500",
    [TextWeight.SemiBold]: "600",
    [TextWeight.Bold]: "700",
    [TextWeight.ExtraBold]: "800",
    [TextWeight.Black]: "900",
    [TextWeight.Light]: "300",
  };

  return (
    <Text fontSize={sizeMap[variant]} fontWeight={weightMap[weight]} {...props}>
      {children}
    </Text>
  );
};
