"use client";
import { Skeleton } from "@mui/material";
import { useBalance } from "../service";

export function BalanceStatus() {
  const balanceQuery = useBalance({
    retry: true,
    refetchInterval: 1000 * 60, // 1 minute
  });
  return (
    <div>
      <h6 className="text-xs dark:text-gray-400 text-gray-600">Balance</h6>
      {balanceQuery.isLoading ? (
        <Skeleton variant="text" height={28} />
      ) : (
        <p className="text-xl">
          {balanceQuery.data?.toLocaleString()}
          <span className="text-sm dark:text-gray-400 text-gray-600">ETH</span>
        </p>
      )}
    </div>
  );
}
