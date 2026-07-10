import { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "info"
  | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",

  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",

  info:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        h-12
        rounded-xl
        px-5
        font-bold
        transition-colors
        duration-150
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${fullWidth ? "w-full" : ""}
        ${variantClass[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}