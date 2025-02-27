"use client";

import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import DisplayItems from "./DisplayItems";

const CategoryContent = ({ category }: any) => {
  return (
    <Box width={{ base: "100%", sm: "45%", lg: "20%" }} position="relative">
      <Flex
        width="full"
        position="relative"
        overflow="hidden"
        borderRadius="12px"
      >
        <Image
          src="/assets/images/bag.jpg"
          borderRadius="12px"
          objectFit="cover"
          width="100%"
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.3s",
          }}
        />
      </Flex>
      <Box
        position={"absolute"}
        bottom={"5%"}
        left={"50%"}
        transform={"translate(-50%, -5%)"}
      >
        <Button p={"20px"} bgColor={"white"} color={"primary.500"}>
          {category.name}
        </Button>
      </Box>
    </Box>
  );
};

const ShopCategories = () => {
  const categories = [
    { id: 1, name: "Mode", image: "/assets/images/hero/hero.jpg" },
    { id: 2, name: "Électronique", image: "/assets/images/hero/hero.jpg" },
    { id: 3, name: "Maison", image: "/assets/images/hero/hero.jpg" },
    { id: 4, name: "Beauté", image: "/assets/images/hero/hero.jpg" },
    { id: 5, name: "Mode", image: "/assets/images/hero/hero.jpg" },
    { id: 6, name: "Électronique", image: "/assets/images/hero/hero.jpg" },
    { id: 7, name: "Maison", image: "/assets/images/hero/hero.jpg" },
    { id: 8, name: "125", image: "/assets/images/hero/hero.jpg" },
  ];
  return (
    <DisplayItems
      label="Catégories"
      items={categories.map((c) => ({
        content: <CategoryContent key={c.id} category={c} />,
      }))}
      itemsPerPages={4}
      pageIndex={0}
    />
  );
};

export default ShopCategories;
