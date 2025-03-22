"use client";

import React, { ReactNode, useState } from "react";
import Layout from "_app/layout/Layout";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {} = useSelector(AuthModule.selectors.authSelector);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState<any>();
  const router = useRouter();

  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

export default ProtectedRoute;
