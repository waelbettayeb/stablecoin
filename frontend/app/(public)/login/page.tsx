"use client";
import React from "react";
import LoginForm from "./LoginForm";
import A from "next/link";
import { Link } from "@mui/material";

export default function LoginPage() {
  return (
    <main className="items-center justify-center h-full flex">
      <div className="flex flex-col w-full max-w-md p-4 gap-2">
        <h1 className="text-3xl font-bold">Login</h1>
        <LoginForm />
        <div>
          {"Don't have an account? "}
          <A href="/signup" passHref legacyBehavior>
            <Link>Sign up</Link>
          </A>
        </div>
      </div>
    </main>
  );
}
