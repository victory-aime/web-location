"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import BoxContainer from "_components/custom/container/BoxContainer";
import { IoIosPaper } from "react-icons/io";
import React, { useState } from "react";
import { BoxIcon } from "./BoxIcon";
import { CustomTable } from "_components/custom/data-table/CommonDataTable";

const handleEdit = (id: number) => console.log("Modifier :", id);
const handleDelete = (id: number) => console.log("Supprimer :", id);
const handleDetails = (id: number) => console.log("Détails :", id);

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

export const CommandTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(items.length / pageSize);

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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetails={handleDetails}
          initialPage={currentPage}
          totalItems={totalPages}
          pageSize={pageSize}
          lazy
          isShow={{ edit: true, delete: true, details: true }}
        />
      </Box>
    </BoxContainer>
  );
};
