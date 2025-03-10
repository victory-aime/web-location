import { toaster } from "_/components/ui/toaster";
import { ToastStatus, DEFAULT_TIME, ToastProps } from "./interface/toats";

export const CustomToast = ({
  title = "Notification",
  type = ToastStatus.SUCCESS,
  description,
  duration,
}: ToastProps) => {
  return toaster.create({
    title,
    description,
    type,
    duration: DEFAULT_TIME ?? duration,
    meta: {
      closable: true,
    },
  });
};
