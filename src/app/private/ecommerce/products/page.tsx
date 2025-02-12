"use client";
import {
  Box,
  Flex,
  Heading,
  Tabs,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { hexToRGB } from "_/theme/colors";
import { BaseButton } from "_components/custom/button";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";
import { FaFirstdraft } from "react-icons/fa6";

import {
  ProductList,
  PublishProductList,
  ProductStock,
  DraftProducts,
} from "./components";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";

const ProductPage = () => {
  const router = useRouter();
  const items = [
    {
      title: "Produits",
      icon: <MdProductionQuantityLimits />,
      content: <ProductList />,
    },
    {
      title: "Expedie",
      icon: <BsFillSendCheckFill />,
      content: <PublishProductList />,
    },
    {
      title: "Stock",
      icon: <FaStoreAlt />,
      content: <ProductStock />,
    },
    {
      title: "Brouillon",
      icon: <FaFirstdraft />,
      content: <DraftProducts />,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box width={"full"} mt={"30px"}>
      <Tabs.Root
        lazyMount
        unmountOnExit
        defaultValue={items[currentIndex]?.title}
        variant={"plain"}
        value={items[currentIndex]?.title}
        onValueChange={({ value }: { value: string }) => {
          const index = items?.findIndex((item) => item?.title === value);
          setCurrentIndex(index);
        }}
      >
        <Flex
          width={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={isMobile ? "column" : "row"}
          overflowX={"auto"}
          gap={4}
        >
          <VStack alignItems={"flex-start"} gap={4} width={"full"}>
            <Heading>Product</Heading>
            <Tabs.List
              bg={"bg.muted"}
              border={"1px solid"}
              borderColor={"whiteAlpha.400"}
              rounded="l3"
              p={"4px"}
              width={isMobile ? "full" : "auto"}
            >
              {items.map((item, index) => (
                <Tabs.Trigger
                  color={
                    currentIndex === index ? "primary.500" : "whiteAlpha.400"
                  }
                  width={"full"}
                  key={index}
                  value={item.title}
                  p={5}
                >
                  {isMobile ? <></> : <>{item?.icon}</>}
                  {item.title}
                </Tabs.Trigger>
              ))}
              <Tabs.Indicator rounded="l2" bgColor={hexToRGB("primary", 0.2)} />
            </Tabs.List>
          </VStack>
          <VStack width={"full"} p={"4px"} gap={4} alignItems={"flex-end"}>
            <BaseButton
              bgColor={"primary.500"}
              p={"8px"}
              leftIcon={<FaPlus />}
              onClick={() =>
                router.replace(APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.ADD)
              }
            >
              Ajouter un produit
            </BaseButton>
            <Flex
              gap={3}
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={"flex-end"}
              width={"full"}
            >
              <BaseButton
                p={"5px"}
                bgColor={"whiteAlpha.500"}
                leftIcon={<FaRegCalendarDays />}
                width={isMobile ? "full" : "auto"}
              >
                Choisir une date
              </BaseButton>
              <BaseButton
                p={"5px"}
                bgColor={"whiteAlpha.500"}
                leftIcon={<TbFilter />}
                width={isMobile ? "full" : "auto"}
              >
                Filtres
              </BaseButton>
            </Flex>
          </VStack>
        </Flex>
        <Box mt={10} mb={50}>
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.title}
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              {item?.content}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Box>
  );
};

export default ProductPage;
