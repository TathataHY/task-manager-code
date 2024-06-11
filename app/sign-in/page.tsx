"use client";

import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-full">
      <ClerkSignIn />
    </div>
  );
}
