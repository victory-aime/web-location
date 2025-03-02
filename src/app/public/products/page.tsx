"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Header from "../components/Header";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  SimpleGrid,
  useBreakpointValue,
  Spinner,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CustomAccordion } from "_/components/custom/accordion/CustomAccordion";
import { BsEyeFill, BsFillSendCheckFill } from "react-icons/bs";
import { FaStoreAlt, FaFirstdraft } from "react-icons/fa";
import Categories from "./components/Categories";
import FilterPrice from "./components/FilterPrice";
import FilterByColor from "./components/FilterByColor";
import FilterBySize from "./components/FilterBySize";
import FilterMobileDisplay from "./components/FilterMobileDisplay";
import { IoIosHeartEmpty } from "react-icons/io";

const fetchProducts = async (filters: any, page: number) => {
  console.log("Filtres appliqués:", filters, "Page:", page);
  return Array.from({ length: 9 }).map((_, index) => ({
    id: index + page * 10,
    name: `Produit ${index + 1 + page * 10}`,
    category: "Category",
    price: Math.floor(Math.random() * 100) + 10,
    image: "/assets/images/bag.jpg",
  }));
};

const PublicProductPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(filters, page);
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, [filters, page]);

  const handleFilterSubmit = (values: any) => {
    setFilters(values);
    setPage(1);
  };

  return (
    <Header>
      <Box padding={10}>
        <Flex
          width={"full"}
          alignItems={"flex-start"}
          gap={5}
          flexDir={{ base: "column", lg: "row" }}
        >
          <Box width={"1/3"}>
            <Box display={{ base: "block", lg: "none" }}>
              <Flex alignItems={"center"} gap={5}>
                <IconButton
                  aria-label="filtres"
                  onClick={() => setOpen(true)}
                  p={3}
                >
                  Filtres
                </IconButton>
              </Flex>
            </Box>
            <Formik
              initialValues={{ price: "", color: "", size: "", category: "" }}
              onSubmit={handleFilterSubmit}
            >
              {({ handleSubmit }) => (
                <Form>
                  {responsiveMode ? (
                    <CustomAccordion
                      items={[
                        {
                          label: "Catégories",
                          icon: <BsFillSendCheckFill />,
                          content: <Categories name="category" />,
                        },
                        {
                          label: "Prix",
                          icon: <FaStoreAlt />,
                          content: <FilterPrice />,
                        },
                        {
                          label: "Couleur",
                          icon: <FaFirstdraft />,
                          content: <FilterByColor />,
                        },
                        {
                          label: "Taille",
                          icon: <FaFirstdraft />,
                          content: <FilterBySize />,
                        },
                      ]}
                    />
                  ) : (
                    <FilterMobileDisplay
                      isOpen={open}
                      onClose={() => setOpen(false)}
                      handleSubmit={handleSubmit}
                    >
                      <CustomAccordion
                        items={[
                          {
                            label: "Catégories",
                            icon: <BsFillSendCheckFill />,
                            content: <Categories name="category" />,
                          },
                          {
                            label: "Prix",
                            icon: <FaStoreAlt />,
                            content: <FilterPrice />,
                          },
                          {
                            label: "Couleur",
                            icon: <FaFirstdraft />,
                            content: <FilterByColor />,
                          },
                          {
                            label: "Taille",
                            icon: <FaFirstdraft />,
                            content: <FilterBySize />,
                          },
                        ]}
                      />
                    </FilterMobileDisplay>
                  )}
                </Form>
              )}
            </Formik>
          </Box>

          <Box width={"full"}>
            {loading ? (
              <Flex justifyContent="center" alignItems="center" height="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <SimpleGrid columns={{ base: 2, lg: 3 }} gap={10} width={"full"}>
                {products.map((product: any) => (
                  <Flex key={product.id}>
                    <Box
                      width={"full"}
                      position="relative"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Flex
                        width="full"
                        position="relative"
                        overflow="hidden"
                        borderRadius="12px"
                      >
                        <Image
                          src={product.image}
                          borderRadius="12px"
                          objectFit="cover"
                          transition="transform 0.3s"
                          transform={isHovered ? "scale(1.05)" : "scale(1)"}
                        />

                        <VStack
                          position="absolute"
                          top="5%"
                          right="5%"
                          gap={4}
                          opacity={isHovered ? 1 : 0}
                          visibility={isHovered ? "visible" : "hidden"}
                          transition="opacity 0.3s"
                        >
                          <IoIosHeartEmpty size={20} cursor="pointer" />
                          <BsEyeFill size={20} cursor="pointer" />
                        </VStack>
                        <Box
                          position="absolute"
                          bottom="5%"
                          left="50%"
                          transform="translate(-50%, -5%)"
                          opacity={isHovered ? 1 : 0}
                          visibility={isHovered ? "visible" : "hidden"}
                          transition="opacity 0.3s"
                        >
                          <Button p="10px" bgColor="white" color="primary.500">
                            Ajouter au panier
                          </Button>
                        </Box>
                      </Flex>

                      <Stack p={2} mt={2}>
                        <Heading size="md">{product.name}</Heading>
                        <Text fontSize="sm">{product.category}</Text>
                        <Flex gap={4}>
                          <Text fontWeight="bold" color="primary.500">
                            ${product.price}
                          </Text>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            )}

            <Flex justifyContent="center" mt={4} gap={4}>
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Précédent
              </Button>
              <Button onClick={() => setPage(page + 1)}>Suivant</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Header>
  );
};

export default PublicProductPage;
