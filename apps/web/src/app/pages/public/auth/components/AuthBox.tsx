import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const AuthBox = ({ children, isResponsive }: { children: ReactNode; isResponsive: boolean }) => {
  return (
    <Box
      animation={'fade'}
      position={'relative'}
      width={'full'}
      gap={4}
      display={'flex'}
      flexDir={isResponsive ? 'row' : 'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {children}
    </Box>
  );
};

export default AuthBox;
