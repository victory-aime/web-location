'use client'

import { Box } from '@chakra-ui/react'
import { CustomBadge, BoxContainer, CommonDataTable, CustomFormatNumber } from '_components/custom'
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types'
import { ProductModule, UsersModule } from 'bvg-innovation-state-management'
import { UTILS } from 'bvg-innovation-shared'
import { useState } from 'react'
import { DeleteProduct } from '../products/components/modal/DeleteProduct'
import { RenderProductImage } from '../products/components/RenderProductImage'

const TrashPage = () => {
  const user = UsersModule.UserCache.getUser()
  const {
    data: trashList,
    isLoading,
    refetch,
  } = ProductModule.getTrashListQueries({
    payload: {
      storeId: user?.store?.id ?? '',
    },
    queryOptions: {
      enabled: !!user?.store?.id,
      retry: 2,
    },
  })
  const { mutateAsync, isPending } = ProductModule.restoreProductMutation({
    onSuccess: () => {
      ProductModule.ProductCache.invalidatePrivateProduct()
      ProductModule.ProductCache.invalidateTrashList()
    },
  })
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [openDelete, setOpenDelete] = useState(false)

  const columns: ColumnsDataTable[] = [
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
      header: 'Supprimer',
      accessor: 'deletedAt',
      cell: (value) => {
        return UTILS.formatCreatedAt(value)
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'restore',
          handleClick: async (value) => {
            await mutateAsync({ productId: value?.id })
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
      title={'Corbeille'}
      description={"Seuls les produits supprimer s'affichent ici. Ils sont supprimes definitivement au bout de 30 jours"}
      border={'none'}
      width={'full'}
      withActionButtons
      actionsButtonProps={{
        isLoading,
        onReload: () => {
          refetch()
        },
      }}
    >
      <Box mt={'30px'}>
        <CommonDataTable
          data={trashList?.content ?? []}
          columns={columns}
          isLoading={isLoading ?? isPending}
          initialPage={trashList?.currentPage}
          totalItems={trashList?.totalPage}
          pageSize={trashList?.totalDataPerPage}
          animationType={'trash'}
          hidePagination={trashList?.totalPage! <= 1}
          lazy={false}
        />
      </Box>
      <DeleteProduct selectedValues={selectedProduct} isOpen={openDelete} onChange={() => setOpenDelete(false)} deleteType={'permanently'} />
    </BoxContainer>
  )
}

export default TrashPage
