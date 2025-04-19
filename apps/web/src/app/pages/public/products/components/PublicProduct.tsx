'use client'

import React from 'react'

import { Box, Flex, Heading } from '@chakra-ui/react'
import { BaseButton } from '_components/custom/button'
import { useRouter } from 'next/navigation'
import { ProductModule } from 'bvg-innovation-state-management'
import { CustomSkeletonLoader } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import CustomProductList from './CustomProductList'
import { useSession } from 'next-auth/react'

export const PublicProductList = () => {
  const { data: session } = useSession()
  const { data: publicProducts, isLoading } = ProductModule.getPublicProductQueries({
    payload: {
      userId: session?.keycloakId,
    },
    queryOptions: {
      staleTime: 0,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  })
  const router = useRouter()

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
            <BaseButton colorType={'primary'} onClick={() => router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.LIST)}>
              Voir plus
            </BaseButton>
          </Flex>
          <Box p={{ base: 5, md: 10 }}>
            <CustomProductList
              products={publicProducts?.content as any}
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
  )
}
