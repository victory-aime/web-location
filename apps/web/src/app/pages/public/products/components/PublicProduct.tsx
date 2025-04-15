'use client';

import React, { useEffect } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { BaseButton } from '_components/custom/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ProductModule } from '@shop/shop-state-management';
import { CustomSkeletonLoader } from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import CustomProductList from './CustomProductList';
import { useSession } from 'next-auth/react';

export const PublicProductList = () => {
  const dispatch = useDispatch();
  const { isLoading, publicProducts } = useSelector(ProductModule.selectors.productSelector);
  const router = useRouter();
  const {data: session} = useSession()

  useEffect(() => {
    try {
      if (session?.keycloakId) {
        dispatch(
          ProductModule.actions.publicProductRequestAction({
            userId: session?.keycloakId,
          })
        );
      } else {
        dispatch(ProductModule.actions.publicProductRequestAction());
      }
    } catch (error) {
      dispatch(ProductModule.actions.publicProductRequestAction());
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Box width={'full'} height={'full'}>
          <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
        </Box>
      ) : (
        <Box>
          <Flex p={{ base: 5, md: 10 }} alignItems={'center'} justifyContent={'space-between'}>
            <Heading>Meilleur produits</Heading>
            <BaseButton
              colorType={'primary'}
              onClick={() => router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.LIST)}
            >
              Voir plus
            </BaseButton>
          </Flex>
          <Box p={{ base: 5, md: 10 }}>
            <CustomProductList
              products={publicProducts?.content}
              initialPage={1}
              pageSize={publicProducts?.totalDataPerPage!}
              totalItems={publicProducts?.totalPages!}
              hidePagination
              lazy
            />
          </Box>
        </Box>
      )}
    </>
  );
};
