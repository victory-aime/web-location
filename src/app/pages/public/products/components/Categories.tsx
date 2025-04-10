import { Box } from '@chakra-ui/react';
import { CheckBoxFom } from '_/components/custom/form';
import { ProductModule } from '_/store/src/modules';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Categories = ({ name }: { name: string }) => {
  const { categories } = useSelector(ProductModule.selectors.productSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(ProductModule.actions.getCategoriesList());
    }
  }, []);

  return (
    <Box mb={8} width={'full'}>
      <CheckBoxFom name={name} items={categories} />
    </Box>
  );
};

export default Categories;
