import { Box, Heading, VStack, HStack } from '@chakra-ui/react';
import { BaseText } from '_components/custom/base-text';
import { BoxIcon } from '_components/custom/boxIcon';
import React from 'react';

const CustomerMobileDisplay = ({ customerDetailsList }: { customerDetailsList: any[] }) => {
  return (
    <Box>
      <Heading>Informations sur le client</Heading>
      <VStack gap={3} mt={10}>
        {customerDetailsList.map((item, index) => (
          <HStack
            key={index}
            width={'full'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap={2}
          >
            <BoxIcon borderRadius={'7px'} color={item.bg}>
              <item.icon color={item.color} />
            </BoxIcon>
            <BaseText>{item.value}</BaseText>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default CustomerMobileDisplay;
