"use client";

type FormTextareaProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
};

export default function FormTextarea({
  value,
  onChange,
  placeholder = "",
  readOnly = false,
  disabled = false,
  rows = 4,
}: FormTextareaProps) {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      rows={rows}
      placeholder={placeholder}
      onChange={(event) => onChange?.(event.target.value)}
      className={`w-full resize-none rounded-xl border border-slate-300 px-3 py-3 text-base font-bold placeholder:text-slate-400 ${
        readOnly || disabled ? "bg-slate-100" : "bg-white"
      }`}
      style={{
        color: "#0f172a",
        WebkitTextFillColor: "#0f172a",
        opacity: 1,
      }}
    />
  );
}