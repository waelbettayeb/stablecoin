"use client";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./client";

export function ApiClientProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
