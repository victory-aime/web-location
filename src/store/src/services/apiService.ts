import axios, { AxiosRequestConfig } from "axios";
import { APIObjectType } from "_store/src/endpoints";
import { handleApiError } from "_utils/handleApis";
import { loaderService } from "_store/src/services/loader";
import { store } from "_/store/store";
import { RootState } from "_/store/rootReducer";
import { PersistPartial } from "redux-persist/es/persistReducer";

export const apiCall = async (
  { url, method, responseType = "json" }: APIObjectType,
  data?: any,
  params?: any,
  showLoader = true,
) => {
  const state = store.getState() as RootState & PersistPartial;
  const token = state.auth?.access_token;

  console.log("token axios", token);

  const headers = {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
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
