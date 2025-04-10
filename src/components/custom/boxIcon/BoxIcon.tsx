import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export const BoxIcon = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      bgColor={color}
      color={'white'}
      borderRadius={'15px'}
      boxSize={'45px'}
    >
      {children}
    </Flex>
  );
};
