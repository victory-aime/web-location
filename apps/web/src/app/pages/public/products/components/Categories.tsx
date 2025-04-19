import { Box } from '@chakra-ui/react'
import { CheckBoxFom } from '_components/custom/form'
import { ProductModule } from 'bvg-innovation-state-management'
import React from 'react'
import { TYPES } from 'bvg-innovation-shared'

const Categories = ({ name, enabled }: { name: string; enabled: boolean }) => {
  const { data: categories } = ProductModule.getCategories({
    queryOptions: {
      enabled: enabled,
      retry: false,
    },
  })

  return (
    <Box mb={8} width="full">
      <CheckBoxFom name={name} items={(categories ?? []) as TYPES.MODELS.PRODUCTS.IProductsCategories[]} />
    </Box>
  )
}

export default Categories
