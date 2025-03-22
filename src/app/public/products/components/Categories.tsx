import { Box, Flex } from "@chakra-ui/react";
import { CheckBoxFom } from "_/components/custom/form";

import React from "react";

const Categories = ({ name }: { name: string }) => {
  return (
    <Box mb={8} width={"full"}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Flex key={index} gap={8}>
          <CheckBoxFom name={name} label={"category"} />
        </Flex>
      ))}
    </Box>
  );
};

export default Categories;
