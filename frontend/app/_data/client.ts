"use client";
import { QueryClient } from "react-query";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type ErrorPayload = {
  message: string;
  error: string;
  statusCode: number;
};

export function getToken() {
  return localStorage.getItem("token");
}

async function requestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  if (["/login", "/register"].includes(config.url || "")) return config;

  const token = getToken();
  // it would be better to store the token in cookies in our case
  // However, we are using localStorage for simplicity
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}

function initAxiosConfig() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.interceptors.request.use(requestInterceptor, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
    undefined,
    async (error: AxiosError<ErrorPayload>) => {
      let data = error.response?.data;
      if (data?.message) error.message = data?.message;
      if (data?.statusCode === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}
initAxiosConfig();
export const queryClient = new QueryClient();
