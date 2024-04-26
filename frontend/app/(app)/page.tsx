import React from "react";
import SendForm from "./SendForm";
import TransactionHistory from "./transactions/TransactionHistory";
import { AppBar, Paper, Toolbar } from "@mui/material";

export default function Home() {
  return (
    <main className="flex-1 flex md:flex-col gap-3 p-4 flex-col-reverse">
      <Paper className="p-4 max-w-md flex-1">
        <h6 className="text-xl">Send money</h6>
        <SendForm />
      </Paper>
      {/* TODO: Move this to a parallel route so it can be rendered on seperate page on mobile */}
      <TransactionHistory />
    </main>
  );
}
