"use client";

import React, { useEffect } from "react";
import Header from "../components/Header";

import CustomProductList from "./products/components/CustomProductList";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { BaseButton } from "_/components/custom/button";
import { Footer } from "../components/Footer";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "../config/routes";
import { useDispatch, useSelector } from "react-redux";
import { ProductModule } from "_/store/src/modules";
import CustomSkeletonLoader from "_/components/custom/custom-skeleton/CustomSkeletonLoader";

const PublicHome = () => {
  const dispatch = useDispatch();
  const { isLoading, publicProducts } = useSelector(
    ProductModule.selectors.productSelector
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(ProductModule.actions.publicProductRequestAction());
  }, []);

  return (
    <Header>
      {isLoading ? (
        <Box width={"full"} height={"full"}>
          <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
        </Box>
      ) : (
        <Box>
          <Flex
            p={{ base: 5, md: 10 }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading>Meilleur produits</Heading>
            <BaseButton
              colorType={"primary"}
              onClick={() => router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.LIST)}
            >
              Voir plus
            </BaseButton>
          </Flex>
          <Box p={{ base: 5, md: 10 }}>
            <CustomProductList
              products={publicProducts}
              initialPage={1}
              pageSize={8}
              hidePagination
              lazy
            />
          </Box>
        </Box>
      )}
      <Footer />
    </Header>
  );
};

export default PublicHome;
