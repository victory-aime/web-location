import { CustomBadge } from "_/components/custom/badge";
import { CommonDataTable } from "_/components/custom/data-table";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import React, { useState } from "react";
import { productStock } from "../data/productData";
import { RenderProductImage } from "./RenderProductImage";

export const ProductStock = () => {
  const pageSize = 10;
  const totalPages = Math.ceil(productStock?.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);

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
      accessor: "category",
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
      header: "Status",
      accessor: "status",
      cell: (value) => {
        return <CustomBadge status={value} type={"product"} />;
      },
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
    <CommonDataTable
      data={productStock}
      columns={columns}
      initialPage={1}
      totalItems={totalPages}
      pageSize={pageSize}
      handleRowSelection={setSelectedRows}
      lazy
    />
  );
};
