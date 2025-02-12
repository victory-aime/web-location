import { Box, Flex, Heading, Tabs, VStack } from "@chakra-ui/react";
import { TabsProps } from "./interface/table";
import { hexToRGB } from "_/theme/colors";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { TbFilter } from "react-icons/tb";
import { BaseButton } from "../button";

export const CommonTabs = ({
  items,
  redirectLink,
  isMobile,
  ...rest
}: TabsProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <Box width={"full"} mt={"30px"}>
      <Tabs.Root
        defaultValue={items[currentIndex]?.label}
        variant={"plain"}
        value={items[currentIndex]?.label}
        onValueChange={({ value }: { value: string }) => {
          const index = items?.findIndex((item) => item?.label === value);
          setCurrentIndex(index);
        }}
        {...rest}
      >
        <Flex
          width={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
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
              width={{ base: "full", md: "auto" }}
            >
              {items.map((item, index) => (
                <Tabs.Trigger
                  color={
                    currentIndex === index ? "primary.500" : "whiteAlpha.400"
                  }
                  width={"full"}
                  key={index}
                  value={item.label}
                  p={5}
                >
                  {isMobile ? <></> : <>{item?.icon}</>}
                  {item.label}
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
              onClick={() => redirectLink && redirectLink()}
            >
              Ajouter un produit
            </BaseButton>
            <Flex
              gap={3}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={"flex-end"}
              width={"full"}
            >
              <BaseButton
                p={"5px"}
                bgColor={"whiteAlpha.500"}
                leftIcon={<FaRegCalendarDays />}
                width={{ base: "full", md: "auto" }}
              >
                Choisir une date
              </BaseButton>
              <BaseButton
                p={"5px"}
                bgColor={"whiteAlpha.500"}
                leftIcon={<TbFilter />}
                width={{ base: "full", md: "auto" }}
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
              value={item.label}
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
