import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { HiHeart } from 'react-icons/hi';
import DisplayItems from './DisplayItems';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_/app/config/routes';

const OurProduct = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();

  return (
    <DisplayItems
      items={Array.from({ length: 8 }).map((_, index) => ({
        content: <ProductCard key={index} isMobile={isMobile ?? false} />,
      }))}
      itemsPerPages={4}
      itemsMobilePage={4}
      pageIndex={0}
      controlled={false}
      label={'Nos produits'}
      onClick={() => router?.push(APP_ROUTES.CLIENT_PAGES.PUBLIC.PRODUCTS_LIST.LIST)}
    />
  );
};

export const ProductCard = ({ isMobile }: { isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      width={{ base: '100%', sm: '45%', lg: '20%' }}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex width="full" position="relative" overflow="hidden" borderRadius="12px">
        <Image
          src="/assets/images/bag.jpg"
          borderRadius="12px"
          objectFit="cover"
          width="100%"
          transition="transform 0.3s"
          transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
        />

        <VStack
          position="absolute"
          top="5%"
          right="5%"
          gap={4}
          opacity={isMobile || isHovered ? 1 : 0}
          visibility={isMobile || isHovered ? 'visible' : 'hidden'}
          transition="opacity 0.3s"
        >
          <HiHeart size={20} cursor="pointer" />
          <BsEyeFill size={20} cursor="pointer" />
        </VStack>

        <Box
          position="absolute"
          bottom="5%"
          left="50%"
          transform="translate(-50%, -5%)"
          opacity={isMobile || isHovered ? 1 : 0}
          visibility={isMobile || isHovered ? 'visible' : 'hidden'}
          transition="opacity 0.3s"
        >
          <Button p="10px" bgColor="white" color="primary.500">
            Ajouter au panier
          </Button>
        </Box>
      </Flex>

      <Stack p={2} mt={2}>
        <Heading size="md">ProductName</Heading>
        <Text fontSize="sm">ProductCategory</Text>
        <Flex gap={4}>
          <Text fontWeight="bold" color="primary.500">
            $12.00
          </Text>
          <Text textDecoration="line-through" color="gray.500">
            $25.00
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default OurProduct;
