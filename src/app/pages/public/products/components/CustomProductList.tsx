import { Box, Stack, For, SimpleGrid, useBreakpointValue, Float, Circle } from '@chakra-ui/react';
import { APP_ROUTES } from '_/app/config/routes';
import ImageRatio from '_/components/custom/aspect-ratio/ImageRatio';
import { BaseText, TextVariant, TextWeight } from '_/components/custom/base-text';
import PaginationDataTable from '_/components/custom/data-table/components/PaginationDataTable';
import { PaginationProps } from '_/components/custom/data-table/interface/data-types';
import NoDataFound from '_/components/custom/no-data-found/NoDataFound';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { GoTrash } from 'react-icons/go';

interface ProductListProps extends PaginationProps {
  products: any[];
  initialPage?: number;
  hidePagination?: boolean;
  table?: any;
  showDeleteButton?: boolean;
  onDeleteButton?: (value: any) => void;
}

const CustomProductList: FC<ProductListProps> = ({
  products,
  initialPage = 1,
  hidePagination = false,
  totalItems,
  pageSize = 5,
  lazy = false,
  showDeleteButton = false,
  onDeleteButton,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, sm: false, lg: false });

  const sortedData =
    Array.isArray(products) && products.length > 0
      ? [...products].sort((a, b) => {
          if (!sortConfig) return 0;
          const { key, direction } = sortConfig;
          return direction === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1;
        })
      : [];

  const paginatedItems = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Box width={'full'}>
      {paginatedItems?.length !== 0 ? (
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={10} width={'full'}>
          <For each={paginatedItems}>
            {(item, index) => (
              <Box
                key={index}
                width={'full'}
                cursor={'pointer'}
                onClick={() =>
                  router.push?.(
                    `${APP_ROUTES.CLIENT_PAGES.PUBLIC.PRODUCTS_LIST.DETAILS}?requestId=${item.id}`
                  )
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box width={'full'} position={'relative'}>
                  <ImageRatio
                    image={item?.images[0]}
                    style={{
                      borderRadius: '7px',
                      transform: `${
                        isMobile || hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                      }`,
                      transition: 'transform 0.3s',
                    }}
                  />
                  {(hoveredIndex === index || isMobile) && showDeleteButton && (
                    <Float
                      placement={{ base: 'top-center', md: 'top-end' }}
                      cursor={'pointer'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteButton?.(item?.id);
                      }}
                    >
                      <Circle size="40px" bg="white" color="red">
                        <GoTrash size={'18px'} />
                      </Circle>
                    </Float>
                  )}
                </Box>

                <Stack p={2} mt={2} width={'full'} gap={1}>
                  <BaseText textTransform={'capitalize'} truncate>
                    {item?.name}
                  </BaseText>
                  <BaseText variant={TextVariant.L} weight={TextWeight.Black} color="blue.500">
                    ${item?.price}
                  </BaseText>
                </Stack>
              </Box>
            )}
          </For>
        </SimpleGrid>
      ) : (
        <NoDataFound />
      )}

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
