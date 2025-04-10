'use client';
import { useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { FaStoreAlt } from 'react-icons/fa';
import { FaFirstdraft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_/app/config/routes';
import { CommonTabs } from '_/components/custom/tabs/Tabs';
import { ProductList, PublishProductList, ProductStock, DraftProducts } from '.';

const PrivateDashboard = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const items = [
    {
      label: 'Tous',
      icon: <MdProductionQuantityLimits />,
      content: <ProductList />,
    },
    {
      label: 'Publie',
      icon: <BsFillSendCheckFill />,
      content: <PublishProductList />,
    },
    {
      label: 'Desactive',
      icon: <FaStoreAlt />,
      content: <ProductStock />,
    },
    {
      label: 'Brouillon',
      icon: <FaFirstdraft />,
      content: <DraftProducts />,
    },
  ];

  return (
    <CommonTabs
      items={items}
      redirectLink={() => router?.replace(APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.ADD)}
      addTitle="Nouveau produit"
      isMobile={isMobile}
    />
  );
};

export default PrivateDashboard;
