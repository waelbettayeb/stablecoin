"use client";

import { useRouter } from "next/navigation";

export function AuthGuard({ children }: React.PropsWithChildren) {
  const token = localStorage.getItem("token");
  const router = useRouter();
  if (!token) {
    router.replace("/login");
    return null;
  }
  return children;
}
