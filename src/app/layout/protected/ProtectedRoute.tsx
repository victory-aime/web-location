"use client";

import React, { ReactNode, useEffect } from "react";
import Layout from "_app/layout/Layout";

import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector(AuthModule.selectors.authSelector);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(APP_ROUTES.PUBLIC.SIGN_IN);
    }
  }, [isLoggedIn, router]);

  return <>{isLoggedIn && <Layout>{children}</Layout>}</>;
};

export default ProtectedRoute;
