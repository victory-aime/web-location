import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LoaderModule } from '_store/src/modules';
import { LoaderLottie } from '_lottie/animations/LottieAnimation';
import { LoaderProps } from './interface/loader';

const Loader: FC<LoaderProps> = ({
  backDrop = true,
  fullScreen = false,
  show = false,
  ...props
}) => {
  const showLoader = useSelector(LoaderModule.selectors.getLoaderSelector);
  return (
    (showLoader || show) && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w={fullScreen ? '100vw' : 'full'}
        h={fullScreen ? '100vh' : 'full'}
        position={'fixed'}
        top={0}
        left={0}
        zIndex={13}
        {...props}
      >
        {backDrop && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(10,16,16,0.85)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="9"
          />
        )}
        <Box zIndex={13}>
          <LoaderLottie />
        </Box>
      </Box>
    )
  );
};

export default Loader;
