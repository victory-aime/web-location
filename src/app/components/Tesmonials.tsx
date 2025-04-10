import React from 'react';
import { Box, Container, Grid, Heading, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { MdOutlineStarRate } from 'react-icons/md';
import DisplayItems from './DisplayItems';
const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Amazing products and fast shipping! Will definitely shop here again.',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'The quality exceeded my expectations. Great customer service too!',
  },
  {
    name: 'Emily Williams',
    rating: 4,
    text: 'Very satisfied with my purchase. The prices are competitive.',
  },
  {
    name: 'Emily Williams',
    rating: 4,
    text: 'Very satisfied with my purchase. The prices are competitive.',
  },
  {
    name: 'Emily Williams',
    rating: 4,
    text: 'Very satisfied with my purchase. The prices are competitive.',
  },
];

export const Testimonials = () => {
  return (
    <DisplayItems
      items={testimonials?.map((testimonial, index) => ({
        content: (
          <Box width={{ base: '100%', sm: '45%', lg: '30%' }} p={10}>
            <Flex bgColor={'gray.100'}>
              <VStack key={index} bg="white" p={6} borderRadius="lg" gap={4} shadow="md">
                <HStack color="yellow.400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <MdOutlineStarRate key={i} fill="currentColor" size={20} />
                  ))}
                </HStack>
                <Text fontSize="lg" fontStyle="italic">
                  "{testimonial.text}"
                </Text>
                <Text fontWeight="bold">{testimonial.name}</Text>
              </VStack>
            </Flex>
          </Box>
        ),
      }))}
      label={'What Our Customers Say'}
      itemsPerPages={2}
    />
  );
};
