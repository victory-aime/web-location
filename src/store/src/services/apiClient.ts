import { getAccessToken } from "_/utils/auth/token-accessor";
import axios from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    const access_token = await getAccessToken();
    console.log("session ====>", access_token);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    console.log("config ====> ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
