"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      className="toaster group"
      toastOptions={{
        style: {
          background: "oklch(0.18 0.014 38)",
          color: "oklch(0.97 0.012 70)",
          border: "1px solid oklch(0.78 0.16 70 / 0.3)",
          borderRadius: "0.75rem",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
