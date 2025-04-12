import { createListCollection } from '@chakra-ui/react';
import { TYPES } from '_store/src';

export const statusOrdersList = () => {
  const data = createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.statusOrderType?.map((item) => ({
        label: item.label,
        value: item.value as TYPES.MODELS.PRODUCTS.IStatusOrder,
      })) || [],
  });
  return data;
};

export const productStatus = () => {
  const data = createListCollection({
    items:
      TYPES.CONSTANTS.PRODUCTS.productListStatus?.map((item) => ({
        label: item.label,
        value: item.value as TYPES.MODELS.PRODUCTS.IProductStatus,
      })) || [],
  });
  return data;
};

export const categoryList = (categories: TYPES.MODELS.PRODUCTS.IProductsCategories[]) => {
  const data = createListCollection({
    items:
      categories?.map((item) => ({
        label: item.name,
        value: item.name,
      })) || [],
  });
  return data;
};
