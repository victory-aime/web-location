import { Box, Flex, Heading, HStack, Tabs, VStack } from "@chakra-ui/react";
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
  title = "Produits",
  addTitle = "Ajouter un produit",
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
          justifyContent={"center"}
          overflowX={"auto"}
          gap={4}
        >
          <VStack alignItems={"flex-start"} gap={4} width={"full"}>
            <Heading>{title}</Heading>
            <Flex
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
              gap={5}
            >
              <Tabs.List
                bg={"bg.muted"}
                border={"1px solid"}
                borderColor={"whiteAlpha.400"}
                rounded="l3"
                p={"4px"}
              >
                {items.map((item, index) => (
                  <Tabs.Trigger
                    color={
                      currentIndex === index ? "primary.500" : "whiteAlpha.400"
                    }
                    key={index}
                    value={item.label}
                    p={5}
                  >
                    {isMobile ? <></> : <>{item?.icon}</>}
                    {item.label}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator
                  rounded="l2"
                  bgColor={hexToRGB("primary", 0.2)}
                />
              </Tabs.List>
              <HStack
                width={"full"}
                p={"4px"}
                gap={4}
                alignItems={{ base: "flex-start", md: "flex-end" }}
                justifyContent={{ base: "flex-start", md: "flex-end" }}
              >
                <BaseButton
                  p={"5px"}
                  colorType={"secondary"}
                  leftIcon={<TbFilter />}
                  width={{ base: "full", md: "auto" }}
                />
                {addTitle && (
                  <BaseButton
                    bgColor={"primary.500"}
                    p={"8px"}
                    leftIcon={<FaPlus />}
                    onClick={() => redirectLink && redirectLink()}
                  >
                    {addTitle}
                  </BaseButton>
                )}
              </HStack>
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
