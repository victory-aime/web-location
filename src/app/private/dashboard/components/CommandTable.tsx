"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import BoxContainer from "_components/custom/container/BoxContainer";
import { IoIosPaper } from "react-icons/io";
import React, { useState } from "react";
import { BoxIcon } from "./BoxIcon";
import { CustomTable } from "_components/custom/data-table/CommonDataTable";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: [
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Clothing",
    "Accessories",
  ][i % 5],
  price: (Math.random() * 1000).toFixed(2),
}));

const columns: ColumnsDataTable[] = [
  { header: "", accessor: "select" },
  { header: "Nom", accessor: "name" },
  { header: "Catégorie", accessor: "category" },
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

export const CommandTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(items.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  return (
    <BoxContainer>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text>Recent Orders</Text>
        <BoxIcon color={"blue.500"}>
          <IoIosPaper />
        </BoxIcon>
      </Flex>
      <Box p={2} w={"full"} mt={8}>
        <CustomTable
          data={items}
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
