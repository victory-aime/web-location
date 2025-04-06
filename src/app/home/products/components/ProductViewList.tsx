"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Box, Flex, useBreakpointValue, IconButton } from "@chakra-ui/react";
import { CustomAccordion } from "_/components/custom/accordion/CustomAccordion";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaStoreAlt, FaFirstdraft } from "react-icons/fa";
import { ProductModule } from "_/store/src/modules";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import CustomSkeletonLoader from "_/components/custom/custom-skeleton/CustomSkeletonLoader";
import Categories from "./Categories";
import CustomProductList from "./CustomProductList";
import FilterByColor from "./FilterByColor";
import FilterBySize from "./FilterBySize";
import FilterMobileDisplay from "./FilterMobileDisplay";
import FilterPrice from "./FilterPrice";

const ProductViewList = () => {
  const dispatch = useDispatch();
  const { isLoading, publicProducts } = useSelector(
    ProductModule.selectors.productSelector
  );
  const pageSize = 6;
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  const totalPages = Math.ceil(publicProducts?.length / pageSize);

  useEffect(() => {
    if (isEmpty(publicProducts)) {
      dispatch(ProductModule.actions.publicProductRequestAction());
    }
  }, [filters]);

  const handleFilterSubmit = (values: any) => {
    setFilters(values);
  };

  return (
    <>
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
            {isLoading ? (
              <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
            ) : (
              <CustomProductList
                products={publicProducts}
                initialPage={1}
                totalItems={totalPages}
                pageSize={pageSize}
                hidePagination={totalPages <= 1}
                lazy
              />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ProductViewList;
