"use client";

import React, { ReactNode } from "react";
import Layout from "_app/layout/Layout";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
