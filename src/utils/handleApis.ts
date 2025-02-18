// export const  = (key: string, fallback: string) => {
//   return getI18n().t(key) || fallback;
// };

import {
  CustomToast,
  ToastPosition,
  ToastStatus,
} from "_/components/custom/toast/CustomToast";

export const handleApiError = (response: {
  status: number;
  data: { message: string };
}) => {
  const statusCode = response?.status || 500;
  const defaultMessage = "Connection Error";

  let description = "";
  const title = "Notification";
  switch (statusCode) {
    case 401:
      description = response?.data?.message || "Unauthorized";
      break;
    case 404:
      description = response?.data?.message || "Not Found";
      break;
    case 403:
      description = "Forbidden";
      break;
    case 500:
      description = "Server Error";
      break;
    default:
      description = response?.data?.message || defaultMessage;
      break;
  }

  console.log("handleApiError called with:", { description, title }); // Ajoutez ce log

  CustomToast({
    description,
    title,
    position: ToastPosition.TOP_START,
    type: ToastPosition,
  });
};

export const handleApiSuccess = (
  response: { message: string; status: number },
  toastType?: ToastStatus
) => {
  const statusCode = response?.message || response?.status;
  const defaultMessage = "Operation successful";

  let description = "";
  const title = "Notification";
  switch (statusCode) {
    case 200:
      description = response?.message || "Success";
      break;
    case 201:
      description = response?.message || "Created";
      break;
    case 204:
      description = "No content";
      break;
    default:
      description = response?.message || defaultMessage;
      break;
  }

  console.log("handleApiSuccess called with:", { description, title }); // Ajoutez ce log

  CustomToast({
    description,
    title,
    position: ToastPosition.TOP_START,
    status: toastType ?? ToastStatus.SUCCESS,
  });
};
