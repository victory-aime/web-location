"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Header from "../components/Header";
import {
  Box,
  Flex,
  useBreakpointValue,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { CustomAccordion } from "_/components/custom/accordion/CustomAccordion";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaStoreAlt, FaFirstdraft } from "react-icons/fa";
import Categories from "./components/Categories";
import FilterPrice from "./components/FilterPrice";
import FilterByColor from "./components/FilterByColor";
import FilterBySize from "./components/FilterBySize";
import FilterMobileDisplay from "./components/FilterMobileDisplay";
import CustomProductList from "./components/CustomProductList";

const fetchProducts = async (filters: any) => {
  console.log("Filtres appliqués:", filters);
  return Array.from({ length: 30 }).map((_, index) => ({
    id: index * 10,
    name: `Produit ${index + 1 * 10}`,
    category: "Category",
    price: Math.floor(Math.random() * 100) + 10,
    image: "/assets/images/bag.jpg",
  }));
};

const PublicProductPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 6;
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });
  const totalPages = Math.ceil(products?.length / pageSize);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(filters);
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, [filters]);

  const handleFilterSubmit = (values: any) => {
    setFilters(values);
  };

  return (
    <Header>
      <Box padding={{ base: 5, lg: 10 }}>
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
              {({ handleSubmit, setFieldValue }) => (
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
                          content: (
                            <FilterPrice
                              name={"price"}
                              onSliderChange={(value) =>
                                setFieldValue("price", value)
                              }
                            />
                          ),
                        },
                        {
                          label: "Couleur",
                          icon: <FaFirstdraft />,
                          content: <FilterByColor name={"color"} />,
                        },
                        {
                          label: "Taille",
                          icon: <FaFirstdraft />,
                          content: <FilterBySize name={"size"} />,
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
                            content: (
                              <FilterPrice
                                name={"price"}
                                onSliderChange={(value) =>
                                  setFieldValue("price", value)
                                }
                              />
                            ),
                          },
                          {
                            label: "Couleur",
                            icon: <FaFirstdraft />,
                            content: <FilterByColor name={"color"} />,
                          },
                          {
                            label: "Taille",
                            icon: <FaFirstdraft />,
                            content: <FilterBySize name={"size"} />,
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
              <CustomProductList
                products={products}
                initialPage={1}
                totalItems={totalPages}
                pageSize={pageSize}
                lazy
              />
            )}
          </Box>
        </Flex>
      </Box>
    </Header>
  );
};

export default PublicProductPage;
