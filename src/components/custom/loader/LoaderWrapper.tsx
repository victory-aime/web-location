'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { LoaderModule } from '_store/src/modules';
import Loader from './Loader';

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const showLoader = useSelector(LoaderModule.selectors.getLoaderSelector);
  return (
    <Box position="relative">
      <Loader show={showLoader} />
      {children}
    </Box>
  );
};

export default LoaderWrapper;
