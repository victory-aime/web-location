import React from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Link,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={16}>
      <Container maxW="1200px">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
        >
          <VStack align="start" gap={4}>
            <Heading size="md">Customer Service</Heading>
            <Link>Contact Us</Link>
            <Link>Shipping Information</Link>
            <Link>Returns & Exchanges</Link>
            <Link>FAQ</Link>
          </VStack>
          <VStack align="start" gap={4}>
            <Heading size="md">About Us</Heading>
            <Link>Our Story</Link>
            <Link>Careers</Link>
            <Link>Press</Link>
            <Link>Blog</Link>
          </VStack>
          <VStack align="start" gap={4}>
            <Heading size="md">Connect With Us</Heading>
            <HStack>
              Facebook
              <Link>Facebook</Link>
            </HStack>
            <HStack>
              Twitter
              <Link>Twitter</Link>
            </HStack>
            <HStack>
              Instagram
              <Link>Instagram</Link>
            </HStack>
          </VStack>
          <VStack align="start" gap={4}>
            <Heading size="md">Contact Info</Heading>
            <HStack>
              Mail
              <Text>support@store.com</Text>
            </HStack>
            <HStack>
              Phone
              <Text>1-800-123-4567</Text>
            </HStack>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};
