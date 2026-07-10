"use client";

type FormInputProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoComplete?: string;
};

export default function FormInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  readOnly = false,
  disabled = false,
  autoComplete = "off",
}: FormInputProps) {
  return (
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onChange={(event) => onChange?.(event.target.value)}
      className={`w-full rounded-xl border border-slate-300 px-3 py-3 text-base font-bold text-slate-900 placeholder:text-slate-400 appearance-none
      ${
        readOnly || disabled
          ? "bg-slate-100 text-slate-700"
          : "bg-white text-slate-900"
      }`}
      style={{
        color: "#0f172a",
        WebkitTextFillColor: "#0f172a",
        opacity: 1,
      }}
    />
  );
}