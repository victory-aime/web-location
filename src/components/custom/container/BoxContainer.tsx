import { Box, BoxProps, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { boxStyle } from "./style";
import { FaPlus } from "react-icons/fa";
import { BaseText, TextVariant } from "../base-text";
import { BaseButton } from "../button";

interface IBoxProps extends BoxProps {
  title?: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
}

const BoxContainer = ({
  title,
  description,
  buttonTitle,
  onClick,
  children,
  ...rest
}: IBoxProps) => {
  return (
    <Box {...boxStyle} {...rest}>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        gap={5}
      >
        <Stack gap={2}>
          <BaseText variant={TextVariant.H3}>{title}</BaseText>
          <BaseText variant={TextVariant.S}>{description}</BaseText>
        </Stack>
        {buttonTitle && (
          <BaseButton
            onClick={onClick}
            colorType={"primary"}
            leftIcon={<FaPlus size={"18px"} />}
          >
            <BaseText>{buttonTitle}</BaseText>
          </BaseButton>
        )}
      </Flex>
      {children}
    </Box>
  );
};

export default BoxContainer;
