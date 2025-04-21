import { defineRecipe } from '@chakra-ui/react';

export const TableRecipe = defineRecipe({
  base: {
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    '&.chakra-table > tbody > tr > td:first-of-type': {
      position: 'relative',
    },
  },
});
