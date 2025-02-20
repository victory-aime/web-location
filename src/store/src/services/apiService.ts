import axios, { AxiosRequestConfig } from "axios";
import { APIObjectType } from "_store/src/endpoints";
import { store } from "_store/store";
import { authLogoutRequestAction } from "_/store/src/modules/auth/actions";
import { handleApiError } from "_utils/handleApis";
import { isTokenExpired } from "_utils/expireToken.utils";
import { loaderService } from "_store/src/services/loader";
import {
  CustomToast,
  ToastStatus,
} from "_/components/custom/toast/CustomToast";

export const apiCall = async (
  { url, method, responseType = "json" }: APIObjectType,
  data?: any,
  token?: string | null,
  params?: any,
  showLoader = true
) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
    params,
    responseType: responseType === "json" ? "json" : "text",
  };

  try {
    if (token && isTokenExpired(token)) {
      store.dispatch(authLogoutRequestAction());
      CustomToast({
        description: "Session expirée. Veuillez vous reconnecter.",
        title: "Attention",
        type: ToastStatus.WARNING,
      });
      return Promise.reject({ status: 401, message: "Session expired" });
    }
    if (showLoader) {
      loaderService.showLoader();
    }

    const response = await axios(config);

    if (showLoader) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      loaderService.hideLoader();
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      handleApiError(error.response);
      return Promise.reject(error.response);
    } else {
      handleApiError({
        status: 500,
        data: { message: "Erreur inconnue lors de l'appel API" },
      });
      return Promise.reject({
        status: 500,
        message: "Erreur inconnue lors de l'appel API",
      });
    }
  } finally {
    if (showLoader) {
      setTimeout(() => {
        loaderService.hideLoader();
      }, 2000);
    }
  }
};
