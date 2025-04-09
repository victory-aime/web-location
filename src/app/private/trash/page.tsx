"use client";

import { Box, FormatNumber, Heading, Text, VStack } from "@chakra-ui/react";
import { CustomBadge } from "_/components/custom/badge";
import { CommonDataTable } from "_/components/custom/data-table";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import { UTILS } from "_/store/src";
import { ProductModule, AuthModule } from "_/store/src/modules";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderProductImage } from "../ecommerce/products/components";
import DeleteProduct from "../ecommerce/products/components/modal/DeleteProduct";

const TrashPage = () => {
  const dispatch = useDispatch();
  const { trashList, isLoading, restoreProduct, deleteProduct } = useSelector(
    ProductModule.selectors.productSelector,
  );
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const pageSize = 10;
  const totalPages = Math.ceil(trashList?.content?.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    dispatch(
      ProductModule.actions.getTrashProductRequestAction({
        storeId:
          currentUser?.store?.id ?? "cbbd22b6-9f1f-4d73-a553-3d706308080d", //"939cfc00-dc4c-4327-9db9-362d08bcfb52",
      }),
    );
    if (restoreProduct || deleteProduct) {
      dispatch(ProductModule.actions.clearStateKeysAction());
    }
  }, [restoreProduct, deleteProduct]);

  const columns: ColumnsDataTable[] = [
    { header: "", accessor: "select" },
    {
      header: "Produits",
      accessor: "product",
      cell: (value) => {
        return <RenderProductImage value={value} />;
      },
    },
    {
      header: "Catégorie",
      accessor: "categoryName",
    },
    {
      header: "Stock",
      accessor: "stock",
    },
    {
      header: "Prix",
      accessor: "price",
      cell: (price) => {
        return (
          <FormatNumber value={price} style={"currency"} currency={"USD"} />
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => {
        return <CustomBadge status={value} type={"product"} />;
      },
    },
    {
      header: "Supprimer",
      accessor: "deletedAt",
      cell: (value) => {
        return UTILS.formatCreatedAt(value);
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      actions: [
        {
          name: "restore",
          handleClick: (value) => {
            setSelectedProduct(value);
            dispatch(
              ProductModule.actions.restoreProductRequestAtion({
                productId: value?.id,
              }),
            );
          },
        },
        {
          name: "delete",
          handleClick: (value) => {
            setSelectedProduct(value);
            setOpenDelete(true);
          },
        },
      ],
    },
  ];

  return (
    <>
      <Box width={"full"} mt={"30px"}>
        <VStack alignItems={"flex-start"} gap={4}>
          <Heading>Corbeille</Heading>
          <Text color={"gray.400"}>
            Seuls les produits supprimer s'affichent ici. Ils sont supprimes
            definitivement au bout de 30 jours
          </Text>
        </VStack>
        <Box mt={20}>
          <CommonDataTable
            data={trashList?.content}
            columns={columns}
            isLoading={isLoading}
            initialPage={1}
            totalItems={totalPages}
            pageSize={pageSize}
            animationType={"trash"}
            handleRowSelection={setSelectedRows}
            hidePagination={totalPages <= 1}
            lazy
          />
        </Box>
      </Box>
      <DeleteProduct
        selectedValues={selectedProduct}
        isOpen={openDelete}
        onChange={() => setOpenDelete(false)}
        deleteType={"permanently"}
      />
    </>
  );
};

export default TrashPage;
