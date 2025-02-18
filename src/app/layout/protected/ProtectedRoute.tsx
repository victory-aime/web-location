"use client";

import React, { ReactNode, useState } from "react";
import Layout from "_app/layout/Layout";

import { Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Layout>{children}</Layout>;
  }

  return children;
};

export default ProtectedRoute;
