import { CustomBadge } from "_/components/custom/badge";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import React, { useEffect, useState } from "react";
import { RenderProductImage } from "./RenderProductImage";
import { CommonDataTable } from "_/components/custom/data-table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AuthModule, ProductModule } from "_/store/src/modules";
import { UTILS } from "_/store/src";
import { Box, FormatNumber } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";
import { ProductDetails } from "./modal/ProductDetails";
import DeleteProduct from "./modal/DeleteProduct";

export const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading, deleteProduct } = useSelector(
    ProductModule.selectors.productSelector
  );
  const router = useRouter();
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const pageSize = 5;
  const totalPages = Math.ceil(products?.content?.length / pageSize);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    dispatch(
      ProductModule.actions.getAllProductsRequestAction({
        storeId: currentUser?.store?.id ?? "",
      })
    );
    if (deleteProduct) {
      dispatch(ProductModule.actions.clearStateKeysAction());
    }
  }, [deleteProduct]);

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
      header: "Ajout",
      accessor: "createdAt",
      cell: (value) => {
        return UTILS.formatCreatedAt(value);
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      actions: [
        {
          name: "edit",
          title: "edit les value",
          handleClick: (value) => {
            router.push(
              `${APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.ADD}?requestId=${value?.id}`
            );
          },
        },
        {
          name: "view",
          handleClick: (value) => {
            setSelectedProduct(value);
            setOpenDetail(true);
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
    <Box>
      <CommonDataTable
        data={products?.content}
        isLoading={isLoading}
        columns={columns}
        initialPage={1}
        totalItems={totalPages}
        pageSize={pageSize}
        handleRowSelection={setSelectedRows}
        hidePagination={totalPages <= 1}
        lazy
      />
      <ProductDetails
        isOpen={openDetail}
        onChange={() => setOpenDetail(false)}
        selectedValues={selectedProduct}
      />
      <DeleteProduct
        isOpen={openDelete}
        onChange={() => setOpenDelete(false)}
        selectedValues={selectedProduct}
      />
    </Box>
  );
};
