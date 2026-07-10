type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "number" | "email";
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export default function InputField({
  label,
  placeholder,
  value = "",
  type = "text",
  required = false,
  disabled = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-black text-slate-900">
          {label}
          {required && (
            <span className="ml-1 text-red-600">*</span>
          )}
        </label>
      )}

      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-base
          font-bold
          text-slate-900
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-green-500
          focus:ring-2
          focus:ring-green-200
          disabled:bg-slate-100
        "
      />
    </div>
  );
}