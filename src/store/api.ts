import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "src/constants";
import type { Store } from "redux";
import { RootState } from "store/index";

export const api = axios.create({ baseURL: API.URL, timeout: API.TIMEOUT });

export const init = (store: Store<RootState>) => {
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
};
