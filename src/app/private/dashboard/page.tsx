import React from "react";
import {
  ListOrders,
  ReviewStats,
  WeeklyDepenses,
  RecentOrders,
  MonthlyIncomes,
  TopProducts,
  TopCategory,
} from "./components";
import { Flex, For, Box } from "@chakra-ui/react";
import { statData } from "./components/data/data";

const Dashoard = () => {
  return (
    <Box width={"full"}>
      <Flex gap={8} width={"full"} mt={50} overflowX={"auto"}>
        <For each={statData}>
          {(item, index) => <ReviewStats key={index} {...item} />}
        </For>
      </Flex>
      <Flex
        gap={8}
        width={"full"}
        mt={"30px"}
        flexDir={{ base: "column", md: "row" }}
        overflowX={"auto"}
      >
        <WeeklyDepenses />
        <ListOrders />
      </Flex>
      <Flex
        width={"full"}
        h={"100%"}
        gap={8}
        mt={"30px"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <Flex width={"100%"}>
          <RecentOrders />
        </Flex>
        <Flex width={{ base: "100%", md: "1/3" }}>
          <MonthlyIncomes />
        </Flex>
      </Flex>
      <Flex
        gap={8}
        width={{ base: "100%", md: "full" }}
        flexDir={{ base: "column", md: "row" }}
        overflowX={"auto"}
      >
        <TopProducts />
        <TopCategory />
      </Flex>
    </Box>
  );
};

export default Dashoard;
