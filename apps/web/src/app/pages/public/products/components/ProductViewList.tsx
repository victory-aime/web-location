'use client';

import React, { useState, useEffect } from 'react';
import { Formik, FormikValues } from 'formik';
import { Box, Flex, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { CustomAccordion } from '_components/custom/accordion/CustomAccordion';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { FaStoreAlt } from 'react-icons/fa';
import { ProductModule } from '@shop/shop-state-management';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { CustomSkeletonLoader } from '_components/custom';
import Categories from './Categories';
import CustomProductList from './CustomProductList';
import FilterMobileDisplay from './FilterMobileDisplay';
import FilterPrice from './FilterPrice';
import { BaseButton } from '_components/custom/button';
import { useSearchParams } from 'next/navigation';

const ProductViewList = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams()?.get('search')
  const { isLoading, publicProducts } = useSelector(ProductModule.selectors.productSelector);
  const [open, setOpen] = useState(false);
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    if (isEmpty(publicProducts?.content)) {
      dispatch(ProductModule.actions.publicProductRequestAction());
    }
  }, []);

  useEffect(() => {
    if(searchParams){
      dispatch(ProductModule.actions.publicProductRequestAction({
        productTitle: searchParams
      }));
    }
  }, [searchParams]);
  

  const handleFilterSubmit = (values: FormikValues) => {
    const request = {
      categories: values?.category,
      minPrice: values?.price[0],
      maxPrice: values?.price[1],
    };
    dispatch(ProductModule.actions.publicProductRequestAction(request));
  };

  return (
  
      <Box padding={{ base: 5, lg: '50px' }}>
        <Flex
          width={'full'}
          alignItems={'flex-start'}
          gap={'30px'}
          flexDir={{ base: 'column', lg: 'row' }}
        >
          <Box width={'1/3'}>
            <Box display={{ base: 'block', lg: 'none' }}>
              <Flex alignItems={'center'} gap={5}>
                <IconButton aria-label="filtres" onClick={() => setOpen(true)} p={3}>
                  Filtres
                </IconButton>
              </Flex>
            </Box>
            <Formik
              enableReinitialize
              initialValues={{
                price: [0, 2000],
                category: [],
              }}
              onSubmit={handleFilterSubmit}
            >
              {({ handleSubmit, setFieldValue, values }) => {
                useEffect(() => {
                  setFiltersChanged(
                    values.category.length > 0 || values.price[0] !== 0 || values.price[1] !== 2000
                  );
                }, [values]);
                return (
                  <Box>
                    {responsiveMode ? (
                      <>
                        <CustomAccordion
                          items={[
                            {
                              label: 'Catégories',
                              icon: <BsFillSendCheckFill />,
                              content: <Categories name="category" />,
                            },
                            {
                              label: 'Prix',
                              icon: <FaStoreAlt />,
                              content: (
                                <FilterPrice
                                  name={'price'}
                                  onSliderChange={(value) => setFieldValue('price', value)}
                                />
                              ),
                            },
                          ]}
                        />
                        {filtersChanged && (
                          <BaseButton
                            width={'full'}
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
                        isOpen={open}
                        onChange={() => setOpen(false)}
                        handleSubmit={handleSubmit}
                      >
                        <CustomAccordion
                          items={[
                            {
                              label: 'Catégories',
                              icon: <BsFillSendCheckFill />,
                              content: <Categories name="category" />,
                            },
                            {
                              label: 'Prix',
                              icon: <FaStoreAlt />,
                              content: (
                                <FilterPrice
                                  name={'price'}
                                  onSliderChange={(value) => setFieldValue('price', value)}
                                />
                              ),
                            },
                          ]}
                        />
                      </FilterMobileDisplay>
                    )}
                  </Box>
                );
              }}
            </Formik>
          </Box>

          <Box width={'full'}>
            {isLoading ? (
              <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
            ) : (
              <CustomProductList
                products={publicProducts?.content}
                initialPage={1}
                totalItems={publicProducts?.totalPages}
                pageSize={publicProducts.totalDataPerPage!}
                hidePagination={publicProducts?.totalPages! <= 1}
                lazy
              />
            )}
          </Box>
        </Flex>
      </Box>
   
  );
};

export default ProductViewList;
