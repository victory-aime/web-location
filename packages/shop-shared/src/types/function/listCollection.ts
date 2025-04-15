import { createListCollection } from '@chakra-ui/react'
import { TYPES } from '../..'

export const statusOrdersList = () => {
  return createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.statusOrderType?.map((item) => ({
        label: item.label,
        value: item.value as TYPES.MODELS.PRODUCTS.IStatusOrder,
      })) || [],
  })
}

export const productStatus = () => {
  return createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.productListStatus?.map((item) => ({
        label: item.label,
        value: item.value as TYPES.MODELS.PRODUCTS.IProductStatus,
      })) || [],
  })
}

export const categoryList = (categories: TYPES.MODELS.PRODUCTS.IProductsCategories[]) => {
  return createListCollection({
    items:
      categories?.map((item) => ({
        label: item.name,
        value: item.name,
      })) || [],
  })
}
