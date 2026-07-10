"use client";

import { ReactNode } from "react";

type FormLabelProps = {
  children: ReactNode;
  required?: boolean;
};

export default function FormLabel({
  children,
  required = false,
}: FormLabelProps) {
  return (
    <div className="mb-1 text-sm font-black text-slate-700">
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </div>
  );
}