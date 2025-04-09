import {Box, Flex, For} from "@chakra-ui/react";
import {statData} from "_app/private/dashboard/data/data";
import {ReviewStats} from "_app/private/dashboard/components/ReviewStats";
import {WeeklyDepenses} from "_app/private/dashboard/components/WeeklyDepenses";
import {ListOrders} from "_app/private/dashboard/components/ListOrder";
import {RecentOrders} from "_app/private/dashboard/components/RecentOrders";
import {MonthlyIncomes} from "_app/private/dashboard/components/MonthlyIncomes";
import {TopProducts} from "_app/private/dashboard/components/TopProducts";
import {TopCategory} from "_app/private/dashboard/components/TopCategory";
import React from "react";


export const Dashboard = () => {
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
    )
}