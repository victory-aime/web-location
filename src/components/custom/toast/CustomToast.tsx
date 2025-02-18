import { toaster } from "_/components/ui/toaster";

const DEFAULT_TIME = 5000;

export enum ToastStatus {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
  WARNING = "warning",
  INFO = "info",
}

interface Props {
  title?: string;
  description?: string;
  type?: ToastStatus | undefined;
  duration?: number;
}

export const CustomToast = ({
  title,
  type = ToastStatus.SUCCESS,
  description,
  duration,
}: Props) => {
  return toaster.create({
    title,
    description,
    type,
    duration: DEFAULT_TIME ?? duration,
  });
};
