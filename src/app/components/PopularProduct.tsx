import React from 'react';
import { Box, Grid, Heading, Image, Text, Button, VStack, Container } from '@chakra-ui/react';
const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b',
  },
  {
    id: 4,
    name: 'Camera Lens',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35',
  },
];
export const PopularProducts = () => {
  return (
    <Box py={16}>
      <Container maxW="1200px">
        <Heading mb={8}>Popular Products</Heading>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={8}
        >
          {products.map((product) => (
            <VStack
              key={product.id}
              gap={4}
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              transition="transform 0.2s"
              _hover={{
                transform: 'translateY(-4px)',
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="cover"
                borderRadius="md"
              />
              <Text fontSize="lg" fontWeight="semibold">
                {product.name}
              </Text>
              <Text fontSize="xl" color="blue.600">
                ${product.price}
              </Text>
              <Button colorScheme="blue" width="full">
                Add to Cart
              </Button>
            </VStack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
