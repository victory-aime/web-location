'use client';

import { Box, Flex, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import { BaseText, TextVariant, TextWeight } from '_/components/custom/base-text';
import { BoxIcon } from '_components/custom/boxIcon';
import React from 'react';
import CustomerMobileDisplay from './CustomerMobileDisplay';

const Customer = ({ customerDetailsList }: { customerDetailsList: any[] }) => {
  const responsive = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      {responsive ? (
        <Box>
          <BaseText weight={TextWeight.Bold} variant={TextVariant.H3}>
            Client
          </BaseText>
          <VStack gap={3} mt={10}>
            {customerDetailsList.map((item, index) => (
              <HStack
                key={index}
                width={'full'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                  <BoxIcon borderRadius={'7px'} color={item.bg}>
                    <item.icon color={item.color} />
                  </BoxIcon>
                  <BaseText>{item.label}</BaseText>
                </Flex>
                <BaseText>{item.value}</BaseText>
              </HStack>
            ))}
          </VStack>
        </Box>
      ) : (
        <CustomerMobileDisplay customerDetailsList={customerDetailsList} />
      )}
    </>
  );
};

export default Customer;
