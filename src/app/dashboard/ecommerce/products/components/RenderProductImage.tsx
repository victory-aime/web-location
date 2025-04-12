import { Flex, Text } from '@chakra-ui/react';
import ImageRatio from '_/components/custom/aspect-ratio/ImageRatio';
import React from 'react';

export const RenderProductImage = ({ value }: any) => {
  return (
    <Flex width={'full'} alignItems={'center'} gap={4}>
      <Flex width={'60px'} height={'60px'} bgColor={'whiteAlpha.400'} borderRadius={'7px'}>
        <ImageRatio
          image={(value?.images && value?.images[0]) ?? 'https://avatar.iran.liara.run/public'}
        />
      </Flex>
      <Text truncate>{value?.name}</Text>
    </Flex>
  );
};
