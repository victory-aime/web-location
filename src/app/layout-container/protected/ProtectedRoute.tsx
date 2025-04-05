"use client";

import React, { ReactNode } from "react";
import Layout from "_/app/layout-container/Layout";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
