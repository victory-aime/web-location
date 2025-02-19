"use client";

import dynamic from "next/dynamic";
import {
  ConfirmCommand,
  NoDataFoundLottie,
  LoaderAnimation,
} from "_lottie/json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieAnimation = () => {
  return <Lottie animationData={ConfirmCommand} />;
};

const NoDataFoundLottieAnimation = () => {
  return <Lottie animationData={NoDataFoundLottie} />;
};

const LoaderLottie = () => {
  return <Lottie animationData={LoaderAnimation} />;
};

export { LottieAnimation, NoDataFoundLottieAnimation, LoaderLottie };
