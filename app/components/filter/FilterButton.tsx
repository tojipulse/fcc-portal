type FilterButtonProps = {
  onClick: () => void;
};

export default function FilterButton({
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-2
        text-sm
        font-bold
        shadow-sm
        transition-colors
        hover:bg-slate-50
        active:bg-slate-100
      "
    >
      <span>⚙️</span>
      <span>フィルター</span>
    </button>
  );
}