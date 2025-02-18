"use client";

import React, { ReactNode, useState } from "react";
import Layout from "_app/layout/Layout";

import { Spinner } from "@chakra-ui/react";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector(AuthModule.selectors.authSelector);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Layout>{children}</Layout>;
  }

  return children;
};

export default ProtectedRoute;
