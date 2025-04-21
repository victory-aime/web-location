import { ModalComponent } from '_components/custom/modal'
import React, { FC } from 'react'
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { CustomBadge, Rating } from '_components/custom'
import { IProductMoalProps } from './interface/modal-product'

export const ProductDetails: FC<IProductMoalProps> = ({ isOpen, onChange, selectedValues }) => {
  return (
    <ModalComponent title={'Detail du produit'} open={isOpen} onChange={onChange}>
      <Box>
        <Flex width={'full'} gap={4}>
          <Flex width={'150px'} height={'150px'} bgColor={'whiteAlpha.400'} borderRadius={'7px'}>
            <Image
              src={(selectedValues?.product?.images && selectedValues?.product?.images[0]) ?? 'https://avatar.iran.liara.run/public'}
              alt={'image'}
              width={300}
              height={200}
              unoptimized
              style={{ borderRadius: '7px' }}
            />
          </Flex>
          <VStack width={'full'} gap={3} alignItems={'flex-start'}>
            <Heading>{selectedValues?.product?.name}</Heading>
            <Text> stock : {selectedValues?.stock}</Text>
            <Text>categorie: {selectedValues?.categoryName}</Text>
            <CustomBadge status={selectedValues?.status} type={'product'} />
          </VStack>
        </Flex>
        <VStack mt={10} alignItems={'flex-start'}>
          <Text>{selectedValues?.description}</Text>
          <Rating />
        </VStack>
      </Box>
    </ModalComponent>
  )
}
