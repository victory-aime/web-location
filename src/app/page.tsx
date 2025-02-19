"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderLottie } from "_lottie/animations/LottieAnimation";
import { APP_ROUTES } from "./config/routes";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = searchParams.get("pathname");

  useEffect(() => {
    if (pathName === null || pathName === "/") {
      router.replace(APP_ROUTES.PUBLIC.SIGN_IN);
    }
  }, [router, pathName]);

  return null;
}

export default function Home() {
  return (
    <Suspense fallback={<LoaderLottie />}>
      <HomeContent />
    </Suspense>
  );
}
