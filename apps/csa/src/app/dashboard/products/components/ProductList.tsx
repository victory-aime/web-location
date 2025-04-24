'use client'

import { BoxContainer, CustomBadge, CustomFormatNumber } from '_components/custom'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import React, { useState } from 'react'
import { RenderProductImage } from './RenderProductImage'
import { CommonDataTable } from '_components/custom/data-table'
import { ProductModule, UsersModule } from 'bvg-innovation-state-management'
import { UTILS } from 'bvg-innovation-shared'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '_config/routes'
import { ProductDetails } from './modal/ProductDetails'
import { DeleteProduct } from './modal/DeleteProduct'

export const ProductList = () => {
  const cachedUser = UsersModule.UserCache.getUser()
  const { data: products, isLoading } = ProductModule.getPrivateProductQueries({
    payload: {
      storeId: cachedUser?.store?.id ?? '',
    },
  })
  const router = useRouter()
  const [, setSelectedRows] = useState<any>([])
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [openDetail, setOpenDetail] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
        return <CustomFormatNumber value={price} />
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
            router.push(`${APP_ROUTES.PRODUCTS.ADD_EDIT}?requestId=${value?.id}`)
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
            setSelectedProduct(value?.id)
            setOpenDelete(true)
          },
        },
      ],
    },
  ]
  return (
    <BoxContainer
      border={'none'}
      title={'Produits'}
      description={'Gerer vos produits'}
      loader={isLoading}
      numberOfLines={2}
      withActionButtons
      actionsButtonProps={{
        cancelTitle: undefined,
        validateTitle: 'Ajouter un produit',
        onClick: () => {
          router.push(APP_ROUTES.PRODUCTS.ADD_EDIT)
        },
      }}
    >
      <Box mt={'30px'}>
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
      </Box>

      <ProductDetails isOpen={openDetail} onChange={() => setOpenDetail(false)} selectedValues={selectedProduct} />
      <DeleteProduct isOpen={openDelete} onChange={() => setOpenDelete(false)} selectedValues={selectedProduct} />
    </BoxContainer>
  )
}
