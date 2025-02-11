import Lottie from "lottie-react";
import { ConfirmCommand, NoDataFoundLottie } from "_lottie/json";

const LottieAnimation = () => {
  return <Lottie animationData={ConfirmCommand} />;
};
const NoDataFoundLottieAnimation = () => {
  return <Lottie animationData={NoDataFoundLottie} />;
};

export { LottieAnimation, NoDataFoundLottieAnimation };
