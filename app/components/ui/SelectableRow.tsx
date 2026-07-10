type SelectableRowProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function SelectableRow({
  label,
  selected,
  onClick,
}: SelectableRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        px-4
        py-4
        text-left
        transition-all
        duration-150

        ${
          selected
            ? "border-blue-600 bg-blue-50"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <span
        className={`font-bold ${
          selected
            ? "text-blue-700"
            : "text-slate-700"
        }`}
      >
        {label}
      </span>

      <div
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border-2
          text-sm
          font-black

          ${
            selected
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 text-transparent"
          }
        `}
      >
        ✓
      </div>
    </button>
  );
}