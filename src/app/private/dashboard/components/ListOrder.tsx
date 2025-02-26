"use client";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import BoxContainer from "_components/custom/container/BoxContainer";
import { IoIosPaper } from "react-icons/io";
import React, { useState } from "react";
import { CommonDataTable } from "_components/custom/data-table";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import { BoxIcon } from "_/components/custom/boxIcon";
import { totalOrders } from "../data/data";

export const ListOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(totalOrders.ordersTable.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const columns: ColumnsDataTable[] = [
    { header: "", accessor: "select" },
    { header: "Nom", accessor: "name" },
    {
      header: "Catégorie",
      accessor: "category",
    },
    {
      header: "Prix",
      accessor: "price",
    },

    {
      header: "Actions",
      accessor: "actions",
      actions: [
        {
          name: "edit",
          title: "edit les value",
          handleClick: (value) => console.log("value clicked", value),
        },
        {
          name: "view",
          handleClick: (value) => console.log("value clicked", value),
        },
        {
          name: "delete",
          handleClick: (value) => console.log("value clicked", value),
        },
      ],
    },
  ];

  return (
    <BoxContainer>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={4}>
          <Text>Orders</Text>
          <Badge
            rounded={"full"}
            p={2}
            bgColor={totalOrders.orders > 0 ? "primary.500" : "gray.400"}
          >
            <Text color={"white"}>+{totalOrders.orders} orders</Text>
          </Badge>
        </Flex>
        <BoxIcon color={"blue.500"}>
          <IoIosPaper />
        </BoxIcon>
      </Flex>
      <Box p={2} w={"full"} mt={8}>
        <CommonDataTable
          data={totalOrders.ordersTable}
          columns={columns}
          initialPage={currentPage}
          totalItems={totalPages}
          pageSize={pageSize}
          handleRowSelection={setSelectedRows}
          lazy
        />
      </Box>
    </BoxContainer>
  );
};
