"use client";
import { QueryClient } from "react-query";
import axios, { InternalAxiosRequestConfig } from "axios";

export function getToken() {
  return localStorage.getItem("token");
}

async function requestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  if (!["/login", "/refresh_token", "/register"].includes(config.url || ""))
    return config;

  const token = await getToken();
  // it would be better to store the token in cookies in our case
  // However, we are using localStorage for simplicity
  if (token) config.headers.setAuthorization(`Bearer ${token}`);
  return config;
}

function initAxiosConfig() {
  axios.interceptors.request.use(requestInterceptor, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}
initAxiosConfig();
export const queryClient = new QueryClient();
