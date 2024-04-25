"use client";
import React from "react";
import SignupForm from "./SignupForm";
import A from "next/link";
import { Link } from "@mui/material";

export default function SignupPage() {
  return (
    <main className="items-center justify-center h-full flex">
      <div className="flex flex-col w-full max-w-md p-4 gap-2">
        <h1 className="text-3xl font-bold">Welcome to Stablecoin</h1>
        <SignupForm />
        <div>
          {"Already have an account? "}
          <A href="/login" passHref legacyBehavior>
            <Link>Sign in</Link>
          </A>
        </div>
      </div>
    </main>
  );
}
