import { Box, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      h={'100%'}
      width={'100%'}
      ps={{ base: 5, md: '20px' }}
      pe={{ base: 5, md: '33px' }}
      pb={{ base: '1rem', xl: '4rem' }}
    >
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </Box>
  );
};

export default Container;
