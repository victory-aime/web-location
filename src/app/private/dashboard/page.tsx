import React from "react";
import { CommandTable, ReviewStats, WeeklyDepenses } from "./components";
import { Flex, For, Box } from "@chakra-ui/react";
import { statData } from "./components/data/data";

const Dashoard = () => {
  return (
    <Box width={"full"}>
      <Flex
        gap={8}
        width={"full"}
        mt={50}
        overflowX={{ base: "scroll", md: "auto" }}
      >
        <For each={statData}>
          {(item, index) => <ReviewStats key={index} {...item} />}
        </For>
      </Flex>
      <Flex
        gap={8}
        width={"full"}
        mt={"30px"}
        flexDir={{ base: "column", md: "row" }}
        overflowX={{ base: "scroll", md: "auto" }}
      >
        <WeeklyDepenses />
        <CommandTable />
      </Flex>
    </Box>
  );
};

export default Dashoard;
