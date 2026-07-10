"use client";

import type { ReactNode } from "react";

type FormSelectProps = {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
};

export default function FormSelect({
  value,
  onChange,
  disabled = false,
  children,
}: FormSelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value)}
      className={`w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-base font-bold placeholder:text-slate-400 ${
        disabled ? "bg-slate-100" : "bg-white"
      }`}
      style={{
        color: "#0f172a",
        WebkitTextFillColor: "#0f172a",
        opacity: 1,
      }}
    >
      {children}
    </select>
  );
}