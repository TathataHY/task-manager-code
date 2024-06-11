"use client";

import React from "react";

import GlobalProvider from "@/context/global-provider";
import { Toaster } from "react-hot-toast";

function ContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }

  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;
