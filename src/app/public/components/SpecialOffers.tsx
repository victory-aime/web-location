import React from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  Badge,
  HStack,
} from "@chakra-ui/react";
const offers = [
  {
    id: 1,
    name: "Premium Smartphone",
    originalPrice: 999.99,
    discountedPrice: 799.99,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    discount: 20,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    originalPrice: 199.99,
    discountedPrice: 149.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    discount: 25,
  },
];
export const SpecialOffers = () => {
  return (
    <Box py={16}>
      <Container maxW="1200px">
        <Heading mb={8}>Special Offers</Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
          }}
          gap={8}
        >
          {offers.map((offer) => (
            <VStack
              key={offer.id}
              gap={4}
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              position="relative"
            >
              <Badge
                colorScheme="red"
                position="absolute"
                top={4}
                right={4}
                fontSize="lg"
                py={2}
                px={3}
              >
                {offer.discount}% OFF
              </Badge>
              <Image
                src={offer.image}
                alt={offer.name}
                height="300px"
                width="100%"
                objectFit="cover"
                borderRadius="md"
              />
              <Text fontSize="xl" fontWeight="semibold">
                {offer.name}
              </Text>
              <HStack gap={4}>
                <Text fontSize="2xl" color="blue.600">
                  ${offer.discountedPrice}
                </Text>
                <Text
                  fontSize="lg"
                  textDecoration="line-through"
                  color="gray.500"
                >
                  ${offer.originalPrice}
                </Text>
              </HStack>
              <Button colorScheme="blue" size="lg" width="full">
                Shop Now
              </Button>
            </VStack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
