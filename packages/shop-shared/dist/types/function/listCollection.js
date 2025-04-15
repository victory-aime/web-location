import { createListCollection } from '@chakra-ui/react'
import { TYPES } from '../..'
export const statusOrdersList = () => {
  return createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.statusOrderType?.map((item) => ({
        label: item.label,
        value: item.value,
      })) || [],
  })
}
export const productStatus = () => {
  return createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.productListStatus?.map((item) => ({
        label: item.label,
        value: item.value,
      })) || [],
  })
}
export const categoryList = (categories) => {
  return createListCollection({
    items:
      categories?.map((item) => ({
        label: item.name,
        value: item.name,
      })) || [],
  })
}
//# sourceMappingURL=listCollection.js.map
