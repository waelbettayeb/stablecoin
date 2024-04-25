import React from "react";
import SendForm from "./Form";
import TransactionHistory from "./TransactionHistory";
import { AppBar, Paper, Toolbar } from "@mui/material";

export default function Home() {
  return (
    <main className="h-full flex flex-col gap-3 p-4">
      <AppBar component="nav">
        <Toolbar>Transactions</Toolbar>
      </AppBar>
      <Toolbar />
      <Paper className="p-4 max-w-md">
        <h6 className="text-xl">Send money</h6>
        <SendForm />
      </Paper>
      <TransactionHistory />
    </main>
  );
}
