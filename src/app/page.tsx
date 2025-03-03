"use client";
import React, { Suspense } from "react";
import { LoaderLottie } from "_lottie/animations/LottieAnimation";
import PublicHome from "./public/page";


export default function Home() {
  return (
    <Suspense fallback={<LoaderLottie />}>
      <PublicHome />
    </Suspense>
  );
}
