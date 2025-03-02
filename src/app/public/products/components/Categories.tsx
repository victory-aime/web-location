import { Box, Flex } from "@chakra-ui/react";
import { Checkbox } from "_/components/ui/checkbox";
import React from "react";

const Categories = ({ name }: { name: string }) => {
  return (
    <Box mb={8} width={"full"}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Flex key={index} gap={8}>
          <Checkbox name={name} key={index} mb={4}>
            CategoryName
          </Checkbox>
        </Flex>
      ))}
    </Box>
  );
};

export default Categories;
