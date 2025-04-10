import { Box, Flex, Text, Image, VStack, FormatNumber } from '@chakra-ui/react';
import { BaseButton } from '_/components/custom/button';
import BoxContainer from '_components/custom/container/BoxContainer';
import React from 'react';

export const TopProducts = () => {
  return (
    <BoxContainer>
      <Flex p={4} width={'full'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Text>TopProducts</Text>
          <Text color={'gray.700'}>Desc</Text>
        </Box>
        <BaseButton colorType="primary">Voir plus</BaseButton>
      </Flex>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} p={4}>
          <Flex alignItems={'center'} justifyContent={'space-between'} gap={4}>
            <Flex alignItems={'center'} gap={3}>
              <Flex alignItems={'center'} justifyContent={'center'} width={'40px'} height={'40px'}>
                <Image src="https://avatar.iran.liara.run/public" />
              </Flex>
              <Flex flexDir={'column'} alignItems={'flex-start'}>
                <Text>Mouse</Text>
                <Text color={'gray.700'}>category</Text>
              </Flex>
            </Flex>
            <FormatNumber value={1600} notation="compact" currency="USD" style="currency" />
          </Flex>
        </Box>
      ))}
    </BoxContainer>
  );
};
