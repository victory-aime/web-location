import { Box, Flex, Text } from '@chakra-ui/react';
import { CheckBoxFom } from '_/components/custom/form';
import React from 'react';

const FilterBySize = ({ name }: { name: string }) => {
  return (
    <Box width={'full'}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Flex key={index} gap={8} width={'full'}>
          <CheckBoxFom name={name} label={'size'} />
          <Text>(10)</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default FilterBySize;
