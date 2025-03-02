import { Box, Flex, Text } from "@chakra-ui/react";
import { Checkbox } from "_/components/ui/checkbox";
import React from "react";

const FilterBySize = () => {
  return (
    <Box width={"full"}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Flex key={index} gap={8} width={"full"}>
          <Checkbox key={index} mb={4} width={"full"} alignItems={"center"}>
            <Text>S</Text>
          </Checkbox>
          <Text>(10)</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default FilterBySize;
