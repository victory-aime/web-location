import { VStack, HStack } from '@chakra-ui/react';
import { BaseText } from '_/components/custom/base-text';
import { BoxIcon } from '_/components/custom/boxIcon';
import React from 'react';

const OrderClientMobileDisplay = ({ orderDetailsList }: { orderDetailsList: any[] }) => {
  return (
    <VStack gap={3} mt={5}>
      {orderDetailsList.map((item, index) => (
        <HStack width={'full'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
          <BoxIcon borderRadius={'7px'} color={item.bg}>
            <item.icon color={item.color} />
          </BoxIcon>
          <BaseText>{item.value}</BaseText>
        </HStack>
      ))}
    </VStack>
  );
};

export default OrderClientMobileDisplay;
