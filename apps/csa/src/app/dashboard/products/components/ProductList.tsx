'use client'

import { CustomBadge } from '_components/custom'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import React, { useState } from 'react'
import { RenderProductImage } from './RenderProductImage'
import { CommonDataTable } from '_components/custom/data-table'
import { ProductModule, UsersModule } from 'bvg-innovation-state-management'
import { TYPES, UTILS } from 'bvg-innovation-shared'
import { Box, FormatNumber } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '_config/routes'
import { useQueryClient } from '@tanstack/react-query'
import { ProductDetails } from './modal/ProductDetails'
import { DeleteProduct } from './modal/DeleteProduct'

export const ProductList = () => {
  const queryClient = useQueryClient()
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])
  const cacheProduct = queryClient.getQueryData<TYPES.MODELS.PRODUCTS.IPrivateProductResponse>([ProductModule.constants.PRIVATE_PRODUCTS])
  const { data: products, isLoading } = ProductModule.getPrivateProductQueries({
    payload: {
      storeId: cachedUser?.store?.id ?? '',
    },
    queryOptions: {
      enabled: !!cachedUser && cacheProduct?.content?.length === 0,
    },
  })
  const router = useRouter()

  const [, setSelectedRows] = useState<any>([])
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [openDetail, setOpenDetail] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  // useEffect(() => {
  //   dispatch(
  //     ProductModule.actions.getAllProductsRequestAction({
  //       storeId: user?.store?.id ?? '',
  //     })
  //   );
  //   if (deleteProduct) {
  //     dispatch(ProductModule.actions.clearStateKeysAction());
  //   }
  // }, [deleteProduct]);

  const columns: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />
      },
    },
    {
      header: 'Catégorie',
      accessor: 'categoryName',
    },
    {
      header: 'Stock',
      accessor: 'stock',
    },
    {
      header: 'Prix',
      accessor: 'price',
      cell: (price) => {
        return <FormatNumber value={price} style={'currency'} currency={'USD'} />
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        return <CustomBadge status={value} type={'product'} />
      },
    },
    {
      header: 'Ajout',
      accessor: 'createdAt',
      cell: (value) => {
        return UTILS.formatCreatedAt(value)
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          title: 'edit les value',
          handleClick: (value) => {
            router.push(`${APP_ROUTES.PRODUCTS.ADD}?requestId=${value?.id}`)
          },
        },
        {
          name: 'view',
          handleClick: (value) => {
            setSelectedProduct(value)
            setOpenDetail(true)
          },
        },
        {
          name: 'delete',
          handleClick: (value) => {
            setSelectedProduct(value)
            setOpenDelete(true)
          },
        },
      ],
    },
  ]
  return (
    <Box>
      <CommonDataTable
        data={products?.content ?? []}
        isLoading={isLoading}
        columns={columns}
        initialPage={1}
        totalItems={products?.totalPage}
        pageSize={products?.totalDataPerPage}
        handleRowSelection={setSelectedRows}
        hidePagination={products?.totalPage! <= 1}
        lazy={false}
      />
      <ProductDetails isOpen={openDetail} onChange={() => setOpenDetail(false)} selectedValues={selectedProduct} />
      <DeleteProduct isOpen={openDelete} onChange={() => setOpenDelete(false)} selectedValues={selectedProduct} />
    </Box>
  )
}
