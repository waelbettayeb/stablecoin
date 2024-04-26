import React from "react";
import TransactionHistory from "./transactions/TransactionHistory";

export default function Home() {
  return (
    <main className="flex-1 flex md:flex-col gap-3 flex-col-reverse">
      {/* TODO: Move this to a parallel route so it can be rendered on seperate page on mobile */}
      <div className="flex-1 p-3">
        <TransactionHistory />
      </div>
    </main>
  );
}
