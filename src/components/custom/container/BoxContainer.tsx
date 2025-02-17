import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { boxStyle } from "./style";

interface IBoxProps extends BoxProps {}

const BoxContainer = ({ children, ...rest }: IBoxProps) => {
  return (
    <Box {...boxStyle} {...rest}>
      {children}
    </Box>
  );
};

export default BoxContainer;
