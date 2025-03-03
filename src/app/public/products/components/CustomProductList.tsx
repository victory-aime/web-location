import {
  Flex,
  Box,
  VStack,
  Button,
  Stack,
  Heading,
  Text,
  Image,
  For,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import PaginationDataTable from "_/components/custom/data-table/components/PaginationDataTable";
import { PaginationProps } from "_/components/custom/data-table/interface/data-types";
import React, { FC, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";

interface ProductListProps extends PaginationProps {
  products: any[];
  initialPage?: number;
  hidePagination?: boolean;
  table?: any;
}

const CustomProductList: FC<ProductListProps> = ({
  products,
  initialPage = 1,
  hidePagination = false,
  totalItems,
  pageSize = 5,
  lazy = false,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, sm: false, lg: false });

  const sortedData =
    Array.isArray(products) && products.length > 0
      ? [...products].sort((a, b) => {
          if (!sortConfig) return 0;
          const { key, direction } = sortConfig;
          return direction === "asc"
            ? a[key] > b[key]
              ? 1
              : -1
            : a[key] < b[key]
              ? 1
              : -1;
        })
      : [];

  const paginatedItems = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box width={"full"}>
      <SimpleGrid columns={{ base: 2, md: 3 }} gap={10} width={"full"}>
        <For each={paginatedItems}>
          {(item, index) => (
            <Flex width={"full"} gap={"20px"} key={index}>
              <Box
                width={"full"}
                key={index}
                position="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Flex
                  width="full"
                  position="relative"
                  overflow="hidden"
                  borderRadius="12px"
                >
                  <Image
                    src={item?.image}
                    borderRadius="12px"
                    objectFit="cover"
                    transition="transform 0.3s"
                    transform={
                      isMobile || hoveredIndex === index
                        ? "scale(1.05)"
                        : "scale(1)"
                    }
                  />

                  <VStack
                    position="absolute"
                    top="5%"
                    right="5%"
                    gap={4}
                    opacity={isMobile || hoveredIndex === index ? 1 : 0}
                    visibility={
                      isMobile || hoveredIndex === index ? "visible" : "hidden"
                    }
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
                    opacity={isMobile || hoveredIndex === index ? 1 : 0}
                    visibility={
                      isMobile || hoveredIndex === index ? "visible" : "hidden"
                    }
                    transition="opacity 0.3s"
                  >
                    <Button p="10px" bgColor="white" color="primary.500">
                      Ajouter au panier
                    </Button>
                  </Box>
                </Flex>

                <Stack p={2} mt={2}>
                  <Heading size="md">{item?.name}</Heading>
                  <Text fontSize="sm">{item?.category}</Text>
                  <Flex gap={4}>
                    <Text fontWeight="bold" color="primary.500">
                      ${item?.price}
                    </Text>
                  </Flex>
                </Stack>
              </Box>
            </Flex>
          )}
        </For>
      </SimpleGrid>
      {!hidePagination && (
        <PaginationDataTable
          table={{
            setPageIndex: (index: number) => setCurrentPage(index + 1),
          }}
          totalItems={totalItems!}
          pageSize={pageSize}
          currentPage={currentPage}
          lazy={lazy}
          onLazyLoad={(index) => setCurrentPage(index)}
        />
      )}
    </Box>
  );
};

export default CustomProductList;
