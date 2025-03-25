"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "./config/routes";
import { LoaderLottie } from "_lottie/animations/LottieAnimation";
import { Box } from "@chakra-ui/react";
import { getRedirectRoute } from "./hooks/dynamic-redirect";

export default function HomeContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setLoader(false);
      router.replace(APP_ROUTES.PUBLIC.HOME);
      return;
    }
    const userRoles = session?.roles || [];
    router.replace(getRedirectRoute(userRoles));
    setLoader(false);
  }, [router, session, status]);

  if (loader) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w={"100vw"}
        h={"100vh"}
        position={"fixed"}
        top={0}
        left={0}
        zIndex={13}
      >
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(10,16,16,0.85)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="9"
        />
        <Box zIndex={13}>
          <LoaderLottie />
        </Box>
      </Box>
    );
  }

  return null;
}
