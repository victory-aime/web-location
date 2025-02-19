"use client";
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaStoreAlt } from "react-icons/fa";
import { FaFirstdraft } from "react-icons/fa6";

import {
  ProductList,
  PublishProductList,
  ProductStock,
  DraftProducts,
} from "./components";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";
import { CommonTabs } from "_/components/custom/tabs/Tabs";
import ProtectedRoute from "_/app/layout/protected/ProtectedRoute";

const ProductPage = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const items = [
    {
      label: "Produits",
      icon: <MdProductionQuantityLimits />,
      content: <ProductList />,
    },
    {
      label: "Expedie",
      icon: <BsFillSendCheckFill />,
      content: <PublishProductList />,
    },
    {
      label: "Stock",
      icon: <FaStoreAlt />,
      content: <ProductStock />,
    },
    {
      label: "Brouillon",
      icon: <FaFirstdraft />,
      content: <DraftProducts />,
    },
  ];

  return (
    <ProtectedRoute>
      <CommonTabs
        items={items}
        redirectLink={() =>
          router?.replace(APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.ADD)
        }
        isMobile={isMobile}
      />
    </ProtectedRoute>
  );
};

export default ProductPage;
