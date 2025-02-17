"use client";

import { Box, Heading, HStack, Flex, Text } from "@chakra-ui/react";
import { BaseButton } from "_/components/custom/button";
import { CommonDataTable } from "_/components/custom/data-table";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { categoryData } from "./data/data";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import CategoryModal from "./components/CategoryModal";

const Category = () => {
  const pageSize = 10;
  const totalPages = Math.ceil(categoryData?.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedValues, setSelectedValues] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const columns: ColumnsDataTable[] = [
    { header: "", accessor: "select" },
    {
      header: "Category Name",
      accessor: "category",
      cell: (value) => {
        return (
          <Box>
            <Text>{value?.name}</Text>
            <Text>{value?.desc}</Text>
          </Box>
        );
      },
    },
    {
      header: "Sold",
      accessor: "sold",
    },
    {
      header: "Stock",
      accessor: "stock",
    },
    {
      header: "Prix",
      accessor: "price",
    },

    {
      header: "Ajout",
      accessor: "added",
    },
    {
      header: "Actions",
      accessor: "actions",
      actions: [
        {
          name: "edit",
          title: "edit les value",
          handleClick: (value) => {
            setOpen(true);
            setSelectedValues(value);
          },
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
    <Box width={"full"} mt={"30px"}>
      <HStack
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading>Categorie</Heading>
        <BaseButton
          bgColor={"primary.500"}
          p={"8px"}
          leftIcon={<FaPlus />}
          onClick={() => setOpen(true)}
        >
          Ajouter une categorie
        </BaseButton>
      </HStack>
      <Box mt={"30px"}>
        <CommonDataTable
          data={categoryData}
          columns={columns}
          initialPage={1}
          totalItems={totalPages}
          pageSize={pageSize}
          handleRowSelection={() => {}}
          lazy
        />
      </Box>
      <CategoryModal
        values={selectedValues}
        open={open}
        onChange={() => setOpen(false)}
      />
    </Box>
  );
};

export default Category;
