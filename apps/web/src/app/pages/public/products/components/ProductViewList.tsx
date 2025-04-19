'use client'

import React, { useState, useEffect } from 'react'
import { Formik, FormikValues } from 'formik'
import { Box, Flex, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { CustomAccordion } from '_components/custom/accordion/CustomAccordion'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { FaStoreAlt } from 'react-icons/fa'
import { ProductModule } from 'bvg-innovation-state-management'
import { CustomSkeletonLoader } from '_components/custom'
import Categories from './Categories'
import CustomProductList from './CustomProductList'
import FilterMobileDisplay from './FilterMobileDisplay'
import FilterPrice from './FilterPrice'
import { BaseButton } from '_components/custom/button'
import { useSearchParams } from 'next/navigation'

const ProductViewList = () => {
  const searchParams = useSearchParams()?.get('search')
  const [filtersChanged, setFiltersChanged] = useState(false)
  const [enabledGetCategories, setEnabledGetCategories] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    price: [0, 2000],
  })
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  })

  const {
    data: publicProducts,
    isLoading,
    fetchStatus,
  } = ProductModule.getPublicProductQueries({
    payload: {
      productTitle: searchParams ?? null,
      categories: filters.categories,
      minPrice: filters.price[0],
      maxPrice: filters.price[1],
    },
    queryOptions: {
      retry: false,
    },
  })

  useEffect(() => {
    if (fetchStatus === 'fetching') {
      setEnabledGetCategories(true)
    }
  }, [fetchStatus])

  const handleFilterSubmit = (values: FormikValues) => {
    setFilters({
      categories: values?.category,
      price: values?.price,
    })
    setFiltersChanged(true)
  }

  return (
    <Box padding={{ base: 5, lg: '50px' }}>
      <Flex width="full" alignItems="flex-start" gap="30px" flexDir={{ base: 'column', lg: 'row' }}>
        <Box width={'1/3'}>
          <Box display={{ base: 'block', lg: 'none' }}>
            <Flex alignItems="center" gap={5}>
              <IconButton aria-label="filtres" onClick={() => setFiltersChanged(true)} p={3}>
                Filtres
              </IconButton>
            </Flex>
          </Box>

          <Formik
            enableReinitialize
            initialValues={{
              price: filters.price,
              category: filters.categories,
            }}
            onSubmit={handleFilterSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => {
              useEffect(() => {
                const hasChanged = values.category.length > 0 || values.price[0] !== 0 || values.price[1] !== 2000
                setFiltersChanged(hasChanged)
              }, [values])

              const accordionItems = [
                {
                  label: 'Catégories',
                  icon: <BsFillSendCheckFill />,
                  content: <Categories name="category" enabled={enabledGetCategories} />,
                },
                {
                  label: 'Prix',
                  icon: <FaStoreAlt />,
                  content: <FilterPrice name="price" onSliderChange={(value) => setFieldValue('price', value)} />,
                },
              ]

              return (
                <Box>
                  {responsiveMode ? (
                    <>
                      <CustomAccordion items={accordionItems} />
                      {filtersChanged && (
                        <BaseButton
                          width="full"
                          colorType="secondary"
                          isLoading={isLoading}
                          onClick={() => handleSubmit()}
                        >
                          Appliquer les filtres
                        </BaseButton>
                      )}
                    </>
                  ) : (
                    <FilterMobileDisplay
                      isOpen={filtersChanged}
                      onChange={() => setFiltersChanged(false)}
                      handleSubmit={handleSubmit}
                    >
                      <CustomAccordion items={accordionItems} />
                    </FilterMobileDisplay>
                  )}
                </Box>
              )
            }}
          </Formik>
        </Box>

        <Box width="full">
          {isLoading ? (
            <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
          ) : (
            <CustomProductList
              products={publicProducts?.content || []}
              initialPage={1}
              totalItems={publicProducts?.totalPages}
              pageSize={publicProducts?.totalDataPerPage ?? 1}
              hidePagination={(publicProducts?.totalPages ?? 0) <= 1}
              lazy={false}
            />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default ProductViewList
