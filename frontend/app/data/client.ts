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
