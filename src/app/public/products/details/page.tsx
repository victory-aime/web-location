"use client";
import {
  Box,
  Text,
  Flex,
  Stack,
  Image,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Header from "../../components/Header";
import { UTILS } from "_/store/src";
import { useSelector } from "react-redux";
import { ProductModule } from "_/store/src/modules";

const PublicDetailsProducts = () => {
  const requestId = useSearchParams()?.get("requestId");
  const { publicProducts } = useSelector(
    ProductModule.selectors.productSelector
  );
  const findItem = UTILS.findDynamicIdInList(requestId ?? "", publicProducts);

  const images = findItem?.images || [];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Header>
      <Box p={5} width="full">
        <Flex direction={{ base: "column", md: "row" }} gap={5}>
          {/* Section Images */}
          <Box flex={1} bgColor={"yellow"}>
            {/* Image principale sur PC */}
            <Flex width="100%" maxH={"500px"} p={"2"} bgColor={"green"}>
              <Image
                src={selectedImage}
                borderRadius="12px"
                width={"full"}
                objectFit="contain"
                display={{ base: "none", md: "block" }}
              />
            </Flex>

            {/* Miniatures sur PC */}
            <HStack gap={2} mt={3} display={{ base: "none", md: "flex" }}>
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  boxSize="80px"
                  borderRadius="8px"
                  cursor="pointer"
                  border={selectedImage === img ? "2px solid #3182CE" : "none"}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </HStack>

            {/* Affichage en défilement horizontal sur mobile */}
            <Flex
              overflowX="auto"
              gap={2}
              display={{ base: "flex", md: "none" }}
              width="100%"
              p={2}
            >
              {images.map((img, index) => (
                <Image key={index} src={img} borderRadius="12px" width="100%" />
              ))}
            </Flex>
          </Box>

          {/* Section Détails */}
          <Box flex={1}>
            <Stack gap={3}>
              <Heading>{findItem?.name}</Heading>
              <Text fontWeight="bold" color="gray.600">
                {findItem?.category}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Avis & Notes ici
              </Text>
              <Text fontSize="lg">{findItem?.description}</Text>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Header>
  );
};

export default PublicDetailsProducts;
