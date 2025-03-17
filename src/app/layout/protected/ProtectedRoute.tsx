"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Layout from "_app/layout/Layout";

import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";
import { getRedirectRoute } from "_/app/hooks/dynamic-redirect";
import { getTokenOrThrow } from "_/utils/check.token.utils";
import { CustomToast } from "_/components/custom/toast/CustomToast";
import { ToastStatus } from "_/components/custom/toast/interface/toats";
import { authLogoutRequestAction } from "_/store/src/modules/auth/actions";
import { store } from "_/store/store";
import { isTokenExpired } from "_/utils/expireToken.utils";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, currentUser } = useSelector(
    AuthModule.selectors.authSelector,
  );
  const dispatch = useDispatch();
  const [roles, setRoles] = useState<any>();
  const token = getTokenOrThrow();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(APP_ROUTES.PUBLIC.HOME);
    }
    if (isLoggedIn && currentUser?.role) {
      const roles = Array.isArray(currentUser.role)
        ? currentUser.role
        : [currentUser.role];
      setRoles(roles);
    }
    if (token && isTokenExpired(token)) {
      dispatch(
        authLogoutRequestAction({ userId: currentUser?.keycloakId ?? "" }),
      );
      CustomToast({
        description: "Session expirée. Veuillez vous reconnecter.",
        title: "Attention",
        type: ToastStatus.WARNING,
      });
    }
  }, [isLoggedIn, router, token]);

  return (
    <>
      {isLoggedIn && (roles?.includes("vendor") || roles?.includes("admin")) ? (
        <Layout>{children}</Layout>
      ) : isLoggedIn && roles?.includes("users") ? (
        children
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;
