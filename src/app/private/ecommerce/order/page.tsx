"use client";

import { useBreakpointValue } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { CommonTabs } from "_/components/custom/tabs/Tabs";
import { useRouter } from "next/navigation";
import React from "react";
import { GiCancel } from "react-icons/gi";
import { MdOutlineDoneAll } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import {
  OrderCancelled,
  OrderDelivered,
  OrdersInProgress,
  OrdersTable,
} from "./components";
import { IoMdDoneAll } from "react-icons/io";
import Layout from "_/app/layout/Layout";

const OrderPage = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const items = [
    {
      label: "Toutes",
      icon: <IoMdDoneAll />,
      content: <OrdersTable />,
    },
    {
      label: "En cours",
      icon: <TbProgress />,
      content: <OrdersInProgress />,
    },
    {
      label: "Livre",
      icon: <MdOutlineDoneAll />,
      content: <OrderDelivered />,
    },
    {
      label: "Annuler",
      icon: <GiCancel />,
      content: <OrderCancelled />,
    },
  ];

  return (
    <Layout>
      <CommonTabs
        items={items}
        title={"Commandes"}
        addTitle={"Nouvelle commande"}
        redirectLink={() =>
          router?.push(APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.ADD)
        }
        isMobile={isMobile}
      />
    </Layout>
  );
};

export default OrderPage;
