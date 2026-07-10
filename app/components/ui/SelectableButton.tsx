type SelectableButtonVariant = "green" | "red" | "yellow";

type SelectableButtonProps = {
  label: string;
  selected: boolean;
  variant: SelectableButtonVariant;
  onClick: () => void;
};

const selectedClass: Record<SelectableButtonVariant, string> = {
  green: "border-green-600 bg-green-600 text-white",
  red: "border-red-600 bg-red-600 text-white",
  yellow: "border-yellow-400 bg-yellow-400 text-slate-900",
};

const unselectedClass: Record<SelectableButtonVariant, string> = {
  green: "border-green-200 bg-white text-green-600",
  red: "border-red-200 bg-white text-red-600",
  yellow: "border-yellow-200 bg-white text-yellow-700",
};

export default function SelectableButton({
  label,
  selected,
  variant,
  onClick,
}: SelectableButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border-2
        text-base
        font-black
        transition-colors
        ${selected ? selectedClass[variant] : unselectedClass[variant]}
      `}
    >
      {label}
    </button>
  );
}