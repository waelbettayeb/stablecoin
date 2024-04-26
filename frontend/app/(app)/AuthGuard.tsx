"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage, useInterval } from "react-use";
import { useRefresh } from "../(public)/service";

export function AuthGuard({ children }: React.PropsWithChildren) {
  const refereshMutation = useRefresh();
  const token = useLocalStorage("token");
  const router = useRouter();
  useInterval(
    async () => {
      if (!token) return router.replace("/login");
      await refereshMutation.mutateAsync({});
    },
    1000 * 60 * 2 // 2 minutes
  );

  return children;
}
