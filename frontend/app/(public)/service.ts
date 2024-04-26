import axios, { AxiosError, AxiosResponse } from "axios";
import { UseMutationOptions, useMutation } from "react-query";

type Credential = {
  email: string;
  password: string;
};

export async function login(credential: Credential) {
  return axios.post("/auth/login", credential).then((res) => {
    localStorage.setItem("token", res.data.token);
    return res.data;
  });
}

export async function register(credential: Credential) {
  return axios.post("/auth/register", credential).then((res) => {
    localStorage.setItem("token", res.data.token);
    return res.data;
  });
}

export async function logout() {
  localStorage.removeItem("token");
}

export const useLogin = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<any>, AxiosError, Credential, unknown>,
    "mutationFn"
  >
) => useMutation(login, options);

export const useRegister = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<any>, AxiosError, Credential, unknown>,
    "mutationFn"
  >
) => useMutation(register, options);
