import { toaster } from "_components/ui/toaster";

export enum ToastStatus {
  SUCCESS = "success",
}

export enum ToastPosition {
  TOP = "top",
  TOP_START = "top-start",
  TOP_END = "top-end",
  BOTTOM = "bottom",
  BOTTOM_END = "bottom-end",
  BOTTOM_START = "bottom-start",
}

export const CustomToast = ({
  title,
  placement = ToastPosition.TOP,
  type = ToastStatus.SUCCESS,
  description,
}: any) => {
  return toaster.create({
    title,
    description,

    type: type,
  });
};
