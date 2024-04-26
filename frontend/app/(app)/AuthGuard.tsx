"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "react-use";

export function AuthGuard({ children }: React.PropsWithChildren) {
  const token = useLocalStorage("token");
  const router = useRouter();
  if (!token) {
    router.replace("/login");
    return null;
  }
  return children;
}
