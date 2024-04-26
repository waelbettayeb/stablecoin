import axios, { AxiosError, AxiosResponse } from "axios";
import { UseQueryOptions, useQuery } from "react-query";

export async function balance() {
  return axios.get("/balance").then((res) => res.data);
}

export const useBalance = (
  options?: Omit<
    UseQueryOptions<BigInt, AxiosError, BigInt, ["BALANCE"]>,
    "queryFn"
  >
) => useQuery({ ...options, queryKey: ["BALANCE"], queryFn: balance });
